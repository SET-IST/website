import { S3ClientService } from '@/core/services/server'
import { handleS3Exception } from '@/core/utils'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3'

/**
 * Get absolute path to resource, **can only be used in backend code**
 */
export function getFullResourcePath(resource?: string | null) {
  return !!resource
    ? `${process.env.EDGE_STORE_BASE_URL}/${process.env.ES_AWS_BUCKET_NAME}/${resource}`
    : null
}

// Currently EdgeStore doesn't support backend clients, therefore we need to duplicate methods

export async function downloadFile(path: string) {
  try {
    const readableObject = await S3ClientService.send(
      new GetObjectCommand({
        Bucket: process.env.ES_AWS_BUCKET_NAME,
        Key: path,
      })
    )

    return readableObject
  } catch (error) {
    handleS3Exception(error)
  }
}

export async function getFile(path: string) {
  try {
    const { ContentLength, LastModified, Metadata } =
      await S3ClientService.send(
        new HeadObjectCommand({
          Bucket: process.env.ES_AWS_BUCKET_NAME,
          Key: path,
        })
      )

    if (!ContentLength || !LastModified) {
      return
    }

    return {
      url: path,
      metadata: Metadata,
      size: ContentLength,
      uploadedAt: LastModified,
    }
  } catch (error) {
    handleS3Exception(error)
  }
}

export async function deleteFile(path: string) {
  await S3ClientService.send(
    new DeleteObjectCommand({
      Bucket: process.env.ES_AWS_BUCKET_NAME,
      Key: path,
    })
  )
  return {
    success: true,
  }
}
