import { P as PgSchema, t as timestamp, b as text, i as index, c as boolean, f as integer, g as drizzle, r as relations } from "../_libs/drizzle-orm.mjs";
const schema$1 = new PgSchema("medisync");
const addressDetails = schema$1.table(
  "address_details",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    pinCode: text("pin_code").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("address_userId_idx").on(table.userId)]
);
const aadhaarDetails = schema$1.table(
  "aadhaar_details",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
    aadhaarHash: text("aadhaar_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("aadhaar_userId_idx").on(table.userId)]
);
const medicalInformation = schema$1.table(
  "medical_information",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
    allergies: text("allergies").default(""),
    chronicConditions: text("chronic_conditions").default(""),
    currentMedications: text("current_medications").default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("medinfo_userId_idx").on(table.userId)]
);
const emergencyContact = schema$1.table(
  "emergency_contact",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    relationship: text("relationship"),
    phone: text("phone").notNull(),
    email: text("email"),
    isNotificationEnabled: boolean("is_notification_enabled").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("emergency_userId_idx").on(table.userId)]
);
const medicalRecord = schema$1.table(
  "medical_record",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    fileName: text("file_name").notNull(),
    fileType: text("file_type").notNull(),
    testType: text("test_type"),
    hospitalName: text("hospital_name"),
    visitDate: timestamp("visit_date").defaultNow().notNull(),
    fileUrl: text("file_url").notNull(),
    description: text("description"),
    isConfidential: boolean("is_confidential").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("medrec_userId_idx").on(table.userId)]
);
const qrCode = schema$1.table(
  "qr_code",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
    qrCodeData: text("qr_code_data").notNull(),
    qrCodeUrl: text("qr_code_url").notNull(),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => [index("qr_userId_idx").on(table.userId)]
);
const appointment = schema$1.table(
  "appointment",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    doctorName: text("doctor_name").notNull(),
    specialty: text("specialty"),
    hospital: text("hospital"),
    address: text("address"),
    date: text("date").notNull(),
    time: text("time").notNull(),
    status: text("status").notNull().default("upcoming"),
    notes: text("notes"),
    contactNumber: text("contact_number"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("appt_userId_idx").on(table.userId)]
);
const reminder = schema$1.table(
  "reminder",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    type: text("type").notNull().default("medication"),
    date: text("date").notNull(),
    time: text("time"),
    isCompleted: boolean("is_completed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("reminder_userId_idx").on(table.userId)]
);
const healthMetric = schema$1.table(
  "health_metric",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    metricType: text("metric_type").notNull(),
    value: text("value").notNull(),
    unit: text("unit"),
    notes: text("notes"),
    measuredAt: timestamp("measured_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => [index("healthmetric_userId_idx").on(table.userId)]
);
const documentFolder = schema$1.table(
  "document_folder",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    // User-defined labels (tagify); stored as JSON array string
    labels: text("labels").array().notNull().default([]),
    // Always null – flat hierarchy only, kept for schema completeness
    parentFolderId: text("parent_folder_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("docfolder_userId_idx").on(table.userId)]
);
const documentFile = schema$1.table(
  "document_file",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    folderId: text("folder_id").references(() => documentFolder.id, {
      onDelete: "set null"
    }),
    fileName: text("file_name").notNull(),
    fileType: text("file_type").notNull(),
    // MIME type
    fileSize: integer("file_size").notNull(),
    // bytes
    s3Key: text("s3_key").notNull(),
    labels: text("labels").array().notNull().default([]),
    description: text("description"),
    isConfidential: boolean("is_confidential").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [
    index("docfile_userId_idx").on(table.userId),
    index("docfile_folderId_idx").on(table.folderId)
  ]
);
const userStorage = schema$1.table(
  "user_storage",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
    usedBytes: integer("used_bytes").default(0).notNull(),
    quotaBytes: integer("quota_bytes").default(104857600).notNull(),
    // 100 MB
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("userstorage_userId_idx").on(table.userId)]
);
const addressDetailsRelations = relations(addressDetails, ({ one }) => ({
  user: one(user, { fields: [addressDetails.userId], references: [user.id] })
}));
const aadhaarDetailsRelations = relations(aadhaarDetails, ({ one }) => ({
  user: one(user, { fields: [aadhaarDetails.userId], references: [user.id] })
}));
const medicalInformationRelations = relations(medicalInformation, ({ one }) => ({
  user: one(user, { fields: [medicalInformation.userId], references: [user.id] })
}));
const emergencyContactRelations = relations(emergencyContact, ({ one }) => ({
  user: one(user, { fields: [emergencyContact.userId], references: [user.id] })
}));
const medicalRecordRelations = relations(medicalRecord, ({ one }) => ({
  user: one(user, { fields: [medicalRecord.userId], references: [user.id] })
}));
const qrCodeRelations = relations(qrCode, ({ one }) => ({
  user: one(user, { fields: [qrCode.userId], references: [user.id] })
}));
const appointmentRelations = relations(appointment, ({ one }) => ({
  user: one(user, { fields: [appointment.userId], references: [user.id] })
}));
const reminderRelations = relations(reminder, ({ one }) => ({
  user: one(user, { fields: [reminder.userId], references: [user.id] })
}));
const healthMetricRelations = relations(healthMetric, ({ one }) => ({
  user: one(user, { fields: [healthMetric.userId], references: [user.id] })
}));
const documentFolderRelations = relations(documentFolder, ({ one, many }) => ({
  user: one(user, { fields: [documentFolder.userId], references: [user.id] }),
  files: many(documentFile)
}));
const documentFileRelations = relations(documentFile, ({ one }) => ({
  user: one(user, { fields: [documentFile.userId], references: [user.id] }),
  folder: one(documentFolder, { fields: [documentFile.folderId], references: [documentFolder.id] })
}));
const userStorageRelations = relations(userStorage, ({ one }) => ({
  user: one(user, { fields: [userStorage.userId], references: [user.id] })
}));
const otpVerification = schema$1.table(
  "otp_verification",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    phone: text("phone").notNull(),
    saltedHash: text("salted_hash").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => [index("otp_phone_idx").on(table.phone)]
);
const user = schema$1.table("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  phone: text("phone"),
  gender: text("gender"),
  dateOfBirth: timestamp("date_of_birth"),
  bloodGroup: text("blood_group"),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
const session = schema$1.table(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);
const account = schema$1.table(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);
const verification = schema$1.table(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);
const userRelations = relations(user, ({ one, many }) => ({
  sessions: many(session),
  accounts: many(account),
  addressDetails: one(addressDetails),
  aadhaarDetails: one(aadhaarDetails),
  medicalInformation: one(medicalInformation),
  qrCode: one(qrCode),
  emergencyContacts: many(emergencyContact),
  medicalRecords: many(medicalRecord),
  appointments: many(appointment),
  reminders: many(reminder),
  healthMetrics: many(healthMetric)
}));
const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}));
const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}));
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aadhaarDetails,
  aadhaarDetailsRelations,
  account,
  accountRelations,
  addressDetails,
  addressDetailsRelations,
  appointment,
  appointmentRelations,
  documentFile,
  documentFileRelations,
  documentFolder,
  documentFolderRelations,
  emergencyContact,
  emergencyContactRelations,
  healthMetric,
  healthMetricRelations,
  medicalInformation,
  medicalInformationRelations,
  medicalRecord,
  medicalRecordRelations,
  otpVerification,
  qrCode,
  qrCodeRelations,
  reminder,
  reminderRelations,
  schema: schema$1,
  session,
  sessionRelations,
  user,
  userRelations,
  userStorage,
  userStorageRelations,
  verification
}, Symbol.toStringTag, { value: "Module" }));
const db = drizzle(process.env.DATABASE_URL, { schema });
export {
  addressDetails as a,
  aadhaarDetails as b,
  appointment as c,
  db as d,
  emergencyContact as e,
  documentFolder as f,
  documentFile as g,
  healthMetric as h,
  userStorage as i,
  medicalInformation as m,
  otpVerification as o,
  qrCode as q,
  reminder as r,
  schema as s,
  user as u
};
