import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ReadStream } from "fs";
import { Readable } from "stream";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function uploadAudio(fileStream: ReadStream | NodeJS.ReadableStream, filename: string): Promise<string> {
  const audioKey = `readings/${Date.now()}-${filename}`;

  // Ensure stream is Node.js Readable
  const readableStream = fileStream instanceof Readable ? fileStream : Readable.from(fileStream);

  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: audioKey,
    Body: readableStream,
    ContentType: "audio/webm",
  }));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${audioKey}`;
}
