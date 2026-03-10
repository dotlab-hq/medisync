import { relations } from "drizzle-orm";
import { text, timestamp, boolean, index, integer } from "drizzle-orm/pg-core";
import { schema } from "./schema";
import { user } from "./auth-schema";

// ── Address Details ──────────────────────────────────────────────────
export const addressDetails = schema.table(
    "address_details",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .unique()
            .references( () => user.id, { onDelete: "cascade" } ),
        address: text( "address" ).notNull(),
        city: text( "city" ).notNull(),
        state: text( "state" ).notNull(),
        pinCode: text( "pin_code" ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "address_userId_idx" ).on( table.userId )],
);

// ── Aadhaar Details ──────────────────────────────────────────────────
export const aadhaarDetails = schema.table(
    "aadhaar_details",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .unique()
            .references( () => user.id, { onDelete: "cascade" } ),
        aadhaarHash: text( "aadhaar_hash" ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "aadhaar_userId_idx" ).on( table.userId )],
);

// ── Medical Information ──────────────────────────────────────────────
export const medicalInformation = schema.table(
    "medical_information",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .unique()
            .references( () => user.id, { onDelete: "cascade" } ),
        allergies: text( "allergies" ).default( "" ),
        chronicConditions: text( "chronic_conditions" ).default( "" ),
        currentMedications: text( "current_medications" ).default( "" ),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "medinfo_userId_idx" ).on( table.userId )],
);

// ── Emergency Contact ────────────────────────────────────────────────
export const emergencyContact = schema.table(
    "emergency_contact",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        name: text( "name" ).notNull(),
        relationship: text( "relationship" ),
        phone: text( "phone" ).notNull(),
        email: text( "email" ),
        isNotificationEnabled: boolean( "is_notification_enabled" ).default( true ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "emergency_userId_idx" ).on( table.userId )],
);

// ── Medical Record ───────────────────────────────────────────────────
export const medicalRecord = schema.table(
    "medical_record",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        fileName: text( "file_name" ).notNull(),
        fileType: text( "file_type" ).notNull(),
        testType: text( "test_type" ),
        hospitalName: text( "hospital_name" ),
        visitDate: timestamp( "visit_date" ).defaultNow().notNull(),
        fileUrl: text( "file_url" ).notNull(),
        description: text( "description" ),
        isConfidential: boolean( "is_confidential" ).default( false ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "medrec_userId_idx" ).on( table.userId )],
);

// ── QR Code ──────────────────────────────────────────────────────────
export const qrCode = schema.table(
    "qr_code",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .unique()
            .references( () => user.id, { onDelete: "cascade" } ),
        qrCodeData: text( "qr_code_data" ).notNull(),
        qrCodeUrl: text( "qr_code_url" ).notNull(),
        expiresAt: timestamp( "expires_at" ),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
    },
    ( table ) => [index( "qr_userId_idx" ).on( table.userId )],
);

// ── Appointment ──────────────────────────────────────────────────────
export const appointment = schema.table(
    "appointment",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        doctorName: text( "doctor_name" ).notNull(),
        specialty: text( "specialty" ),
        hospital: text( "hospital" ),
        address: text( "address" ),
        date: text( "date" ).notNull(),
        time: text( "time" ).notNull(),
        timezone: text( "timezone" ).notNull().default( "UTC" ),
        status: text( "status" ).notNull().default( "upcoming" ),
        notes: text( "notes" ),
        contactNumber: text( "contact_number" ),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "appt_userId_idx" ).on( table.userId )],
);

// ── Reminder ─────────────────────────────────────────────────────────
export const reminder = schema.table(
    "reminder",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        title: text( "title" ).notNull(),
        description: text( "description" ),
        type: text( "type" ).notNull().default( "medication" ),
        date: text( "date" ).notNull(),
        time: text( "time" ).notNull(),
        timezone: text( "timezone" ).notNull().default( "UTC" ),
        isCompleted: boolean( "is_completed" ).default( false ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "reminder_userId_idx" ).on( table.userId )],
);

// ── Health Metric ────────────────────────────────────────────────────
export const healthMetric = schema.table(
    "health_metric",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        metricType: text( "metric_type" ).notNull(),
        value: text( "value" ).notNull(),
        unit: text( "unit" ),
        notes: text( "notes" ),
        measuredAt: timestamp( "measured_at" ).defaultNow().notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
    },
    ( table ) => [index( "healthmetric_userId_idx" ).on( table.userId )],
);

// ── Document Folder ──────────────────────────────────────────────────
export const documentFolder = schema.table(
    "document_folder",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        name: text( "name" ).notNull(),
        // User-defined labels (tagify); stored as JSON array string
        labels: text( "labels" ).array().notNull().default( [] ),
        // Always null – flat hierarchy only, kept for schema completeness
        parentFolderId: text( "parent_folder_id" ),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "docfolder_userId_idx" ).on( table.userId )],
);

// ── Document File ────────────────────────────────────────────────────
export const documentFile = schema.table(
    "document_file",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        folderId: text( "folder_id" ).references( () => documentFolder.id, {
            onDelete: "set null",
        } ),
        fileName: text( "file_name" ).notNull(),
        fileType: text( "file_type" ).notNull(), // MIME type
        fileSize: integer( "file_size" ).notNull(), // bytes
        s3Key: text( "s3_key" ).notNull(),
        labels: text( "labels" ).array().notNull().default( [] ),
        description: text( "description" ),
        isConfidential: boolean( "is_confidential" ).default( false ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [
        index( "docfile_userId_idx" ).on( table.userId ),
        index( "docfile_folderId_idx" ).on( table.folderId ),
    ],
);

// ── User Storage ─────────────────────────────────────────────────────
export const userStorage = schema.table(
    "user_storage",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .unique()
            .references( () => user.id, { onDelete: "cascade" } ),
        usedBytes: integer( "used_bytes" ).default( 0 ).notNull(),
        quotaBytes: integer( "quota_bytes" ).default( 104857600 ).notNull(), // 100 MB
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "userstorage_userId_idx" ).on( table.userId )],
);

// ── Relations ────────────────────────────────────────────────────────

export const addressDetailsRelations = relations( addressDetails, ( { one } ) => ( {
    user: one( user, { fields: [addressDetails.userId], references: [user.id] } ),
} ) );

export const aadhaarDetailsRelations = relations( aadhaarDetails, ( { one } ) => ( {
    user: one( user, { fields: [aadhaarDetails.userId], references: [user.id] } ),
} ) );

export const medicalInformationRelations = relations( medicalInformation, ( { one } ) => ( {
    user: one( user, { fields: [medicalInformation.userId], references: [user.id] } ),
} ) );

export const emergencyContactRelations = relations( emergencyContact, ( { one } ) => ( {
    user: one( user, { fields: [emergencyContact.userId], references: [user.id] } ),
} ) );

export const medicalRecordRelations = relations( medicalRecord, ( { one } ) => ( {
    user: one( user, { fields: [medicalRecord.userId], references: [user.id] } ),
} ) );

export const qrCodeRelations = relations( qrCode, ( { one } ) => ( {
    user: one( user, { fields: [qrCode.userId], references: [user.id] } ),
} ) );

export const appointmentRelations = relations( appointment, ( { one } ) => ( {
    user: one( user, { fields: [appointment.userId], references: [user.id] } ),
} ) );

export const reminderRelations = relations( reminder, ( { one } ) => ( {
    user: one( user, { fields: [reminder.userId], references: [user.id] } ),
} ) );

export const healthMetricRelations = relations( healthMetric, ( { one } ) => ( {
    user: one( user, { fields: [healthMetric.userId], references: [user.id] } ),
} ) );

export const documentFolderRelations = relations( documentFolder, ( { one, many } ) => ( {
    user: one( user, { fields: [documentFolder.userId], references: [user.id] } ),
    files: many( documentFile ),
} ) );

export const documentFileRelations = relations( documentFile, ( { one } ) => ( {
    user: one( user, { fields: [documentFile.userId], references: [user.id] } ),
    folder: one( documentFolder, { fields: [documentFile.folderId], references: [documentFolder.id] } ),
} ) );

export const userStorageRelations = relations( userStorage, ( { one } ) => ( {
    user: one( user, { fields: [userStorage.userId], references: [user.id] } ),
} ) );

// ── OTP Verification ─────────────────────────────────────────────────
export const otpVerification = schema.table(
    "otp_verification",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        phone: text( "phone" ).notNull(),
        saltedHash: text( "salted_hash" ).notNull(),
        expiresAt: timestamp( "expires_at" ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
    },
    ( table ) => [index( "otp_phone_idx" ).on( table.phone )],
);
