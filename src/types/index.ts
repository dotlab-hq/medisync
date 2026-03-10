import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type {
    user,
    addressDetails,
    aadhaarDetails,
    medicalInformation,
    emergencyContact,
    medicalRecord,
    qrCode,
    appointment,
    reminder,
    healthMetric,
} from "@/db/schema";

// ── Enums ────────────────────────────────────────────────────────────

export const BloodGroup = {
    A_POS: "A_POS",
    A_NEG: "A_NEG",
    B_POS: "B_POS",
    B_NEG: "B_NEG",
    AB_POS: "AB_POS",
    AB_NEG: "AB_NEG",
    O_POS: "O_POS",
    O_NEG: "O_NEG",
} as const;
export type BloodGroup = ( typeof BloodGroup )[keyof typeof BloodGroup];

export const BLOOD_GROUP_LABELS: Record<BloodGroup, string> = {
    A_POS: "A+",
    A_NEG: "A-",
    B_POS: "B+",
    B_NEG: "B-",
    AB_POS: "AB+",
    AB_NEG: "AB-",
    O_POS: "O+",
    O_NEG: "O-",
};

export const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER",
} as const;
export type Gender = ( typeof Gender )[keyof typeof Gender];

export const GENDER_LABELS: Record<Gender, string> = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
};

export const AppointmentStatus = {
    UPCOMING: "upcoming",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
} as const;
export type AppointmentStatus =
    ( typeof AppointmentStatus )[keyof typeof AppointmentStatus];

export const ReminderType = {
    MEDICATION: "medication",
    APPOINTMENT: "appointment",
    CHECKUP: "checkup",
    OTHER: "other",
} as const;
export type ReminderType = ( typeof ReminderType )[keyof typeof ReminderType];

export const MetricType = {
    BLOOD_PRESSURE: "blood_pressure",
    HEART_RATE: "heart_rate",
    BLOOD_SUGAR: "blood_sugar",
    WEIGHT: "weight",
    TEMPERATURE: "temperature",
    OXYGEN_LEVEL: "oxygen_level",
} as const;
export type MetricType = ( typeof MetricType )[keyof typeof MetricType];

// ── Drizzle Inferred Types ───────────────────────────────────────────

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export type AddressDetails = InferSelectModel<typeof addressDetails>;
export type NewAddressDetails = InferInsertModel<typeof addressDetails>;

export type AadhaarDetails = InferSelectModel<typeof aadhaarDetails>;
export type NewAadhaarDetails = InferInsertModel<typeof aadhaarDetails>;

export type MedicalInformation = InferSelectModel<typeof medicalInformation>;
export type NewMedicalInformation = InferInsertModel<typeof medicalInformation>;

export type EmergencyContact = InferSelectModel<typeof emergencyContact>;
export type NewEmergencyContact = InferInsertModel<typeof emergencyContact>;

export type MedicalRecord = InferSelectModel<typeof medicalRecord>;
export type NewMedicalRecord = InferInsertModel<typeof medicalRecord>;

export type QRCode = InferSelectModel<typeof qrCode>;
export type NewQRCode = InferInsertModel<typeof qrCode>;

export type Appointment = InferSelectModel<typeof appointment>;
export type NewAppointment = InferInsertModel<typeof appointment>;

export type Reminder = InferSelectModel<typeof reminder>;
export type NewReminder = InferInsertModel<typeof reminder>;

export type HealthMetric = InferSelectModel<typeof healthMetric>;
export type NewHealthMetric = InferInsertModel<typeof healthMetric>;

// ── Onboarding Form Data ─────────────────────────────────────────────

export interface OnboardingStep1Data {
    name: string;
    phone: string;
    gender: Gender;
    dateOfBirth: string; // ISO date string
}

export interface OnboardingStep2Data {
    address: string;
    city: string;
    state: string;
    pinCode: string;
}

export interface OnboardingStep3Data {
    bloodGroup: BloodGroup;
    allergies: string;
    chronicConditions: string;
    currentMedications: string;
}

export interface OnboardingStep4Data {
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelationship?: string;
    emergencyContactEmail?: string;
}

export interface OnboardingFormData
    extends OnboardingStep1Data,
    OnboardingStep2Data,
    OnboardingStep3Data,
    OnboardingStep4Data { }

// ── User with full profile ───────────────────────────────────────────

export interface UserProfile extends User {
    addressDetails: AddressDetails | null;
    aadhaarDetails: AadhaarDetails | null;
    medicalInformation: MedicalInformation | null;
    emergencyContacts: EmergencyContact[];
    medicalRecords: MedicalRecord[];
    qrCode: QRCode | null;
    appointments: Appointment[];
    reminders: Reminder[];
    healthMetrics: HealthMetric[];
}
