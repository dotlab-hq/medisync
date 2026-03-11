import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import {
  user,
  addressDetails,
  medicalInformation,
  emergencyContact,
} from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'

const onboardingSchema = z.object({
  // Step 1 – Personal Info
  name: z.string().min(1),
  phone: z.string().min(10),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string().min(1),
  // Step 2 – Address
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  pinCode: z.string().min(1),
  // Step 3 – Medical
  bloodGroup: z.enum([
    'A_POS',
    'A_NEG',
    'B_POS',
    'B_NEG',
    'AB_POS',
    'AB_NEG',
    'O_POS',
    'O_NEG',
  ]),
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  currentMedications: z.string().optional(),
  // Step 4 – Emergency Contact
  emergencyContactName: z.string().min(1),
  emergencyContactPhone: z.string().min(10),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactEmail: z.string().email().optional(),
})

export const submitOnboarding = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => onboardingSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    // Update user basic info
    await db
      .update(user)
      .set({
        name: data.name,
        phone: data.phone,
        gender: data.gender,
        dateOfBirth: new Date(data.dateOfBirth),
        bloodGroup: data.bloodGroup,
        onboardingCompleted: true,
      })
      .where(eq(user.id, userId))

    // Upsert address
    const existingAddr = await db.query.addressDetails.findFirst({
      where: eq(addressDetails.userId, userId),
    })
    if (existingAddr) {
      await db
        .update(addressDetails)
        .set({
          address: data.address,
          city: data.city,
          state: data.state,
          pinCode: data.pinCode,
        })
        .where(eq(addressDetails.userId, userId))
    } else {
      await db.insert(addressDetails).values({
        userId,
        address: data.address,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
      })
    }

    // Upsert medical information
    const existingMed = await db.query.medicalInformation.findFirst({
      where: eq(medicalInformation.userId, userId),
    })
    if (existingMed) {
      await db
        .update(medicalInformation)
        .set({
          allergies: data.allergies ?? '',
          chronicConditions: data.chronicConditions ?? '',
          currentMedications: data.currentMedications ?? '',
        })
        .where(eq(medicalInformation.userId, userId))
    } else {
      await db.insert(medicalInformation).values({
        userId,
        allergies: data.allergies ?? '',
        chronicConditions: data.chronicConditions ?? '',
        currentMedications: data.currentMedications ?? '',
      })
    }

    // Add emergency contact
    await db.insert(emergencyContact).values({
      userId,
      name: data.emergencyContactName,
      phone: data.emergencyContactPhone,
      relationship: data.emergencyContactRelationship,
      email: data.emergencyContactEmail,
    })

    return { success: true }
  })
