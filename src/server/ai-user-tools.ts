import { toolDefinition } from '@tanstack/ai'
import { db } from '@/db'
import { userStorage } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getCurrentUserInfoDef = toolDefinition({
  name: 'get_current_user_info',
  description:
    "Fetch the current user's profile, medical information, and storage quota usage. Use this when the user asks about their account details or storage limits.",
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      profile: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: ['string', 'null'] },
          gender: { type: ['string', 'null'] },
          dateOfBirth: { type: ['string', 'null'] },
          bloodGroup: { type: ['string', 'null'] },
          timezone: { type: 'string' },
        },
        required: [
          'id',
          'name',
          'email',
          'phone',
          'gender',
          'dateOfBirth',
          'bloodGroup',
          'timezone',
        ],
        additionalProperties: false,
      },
      medical: {
        type: 'object',
        properties: {
          allergies: { type: ['string', 'null'] },
          chronicConditions: { type: ['string', 'null'] },
          currentMedications: { type: ['string', 'null'] },
        },
        required: ['allergies', 'chronicConditions', 'currentMedications'],
        additionalProperties: false,
      },
      storage: {
        type: 'object',
        properties: {
          usedBytes: { type: 'number' },
          quotaBytes: { type: 'number' },
          remainingBytes: { type: 'number' },
        },
        required: ['usedBytes', 'quotaBytes', 'remainingBytes'],
        additionalProperties: false,
      },
    },
    required: ['profile', 'medical', 'storage'],
    additionalProperties: false,
  },
})

export function createGetCurrentUserInfoTool(userId: string) {
  return getCurrentUserInfoDef.server(async () => {
    const userRecord = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
      with: { medicalInformation: true },
    })
    if (!userRecord) throw new Error('User not found')

    const storage = await db.query.userStorage.findFirst({
      where: eq(userStorage.userId, userId),
    })

    const usedBytes = storage?.usedBytes ?? 0
    const quotaBytes = storage?.quotaBytes ?? 104857600

    return {
      profile: {
        id: userRecord.id,
        name: userRecord.name,
        email: userRecord.email,
        phone: userRecord.phone ?? null,
        gender: userRecord.gender ?? null,
        dateOfBirth: userRecord.dateOfBirth?.toISOString() ?? null,
        bloodGroup: userRecord.bloodGroup ?? null,
        timezone: userRecord.timezone,
      },
      medical: {
        allergies: userRecord.medicalInformation?.allergies ?? null,
        chronicConditions:
          userRecord.medicalInformation?.chronicConditions ?? null,
        currentMedications:
          userRecord.medicalInformation?.currentMedications ?? null,
      },
      storage: {
        usedBytes,
        quotaBytes,
        remainingBytes: Math.max(quotaBytes - usedBytes, 0),
      },
    }
  })
}
