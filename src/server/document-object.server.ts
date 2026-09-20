import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db'
import { documentFile } from '@/db/schema'

function getS3Client(): S3Client {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('S3 credentials are not configured.')
  }

  return new S3Client({
    region: process.env.AWS_REGION ?? 'us-east-1',
    ...(process.env.AWS_S3_ENDPOINT
      ? {
          endpoint: process.env.AWS_S3_ENDPOINT,
          forcePathStyle: true,
          bucketEndpoint: false,
        }
      : {}),
    credentials: { accessKeyId, secretAccessKey },
  })
}

export async function getOwnedDocumentObject(userId: string, id: string) {
  const file = await db.query.documentFile.findFirst({
    where: and(eq(documentFile.id, id), eq(documentFile.userId, userId)),
  })
  if (!file) return null

  const bucket = process.env.AWS_S3_BUCKET
  if (!bucket) throw new Error('S3 bucket is not configured.')

  const object = await getS3Client().send(
    new GetObjectCommand({ Bucket: bucket, Key: file.s3Key }),
  )
  return { file, object }
}
