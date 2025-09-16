import { PrismaClient, Level, ReadingSession } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fetch from "node-fetch";
import { calculateAccuracy } from "../service/calculateAccurancy";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export function resolvers(prisma: PrismaClient) {
  return {
    Query: {
      roadmap: async (_: unknown, args: { language: string }): Promise<Level[]> => {
        return prisma.level.findMany({ orderBy: { id: "asc" } });
      },
      readingSessions: async (_: unknown, args: { levelId: number }): Promise<ReadingSession[]> => {
        return prisma.readingSession.findMany({ where: { levelId: args.levelId } });
      },
    },
    Mutation: {
      generateSentence: async (_: unknown, { language }: { language: string }): Promise<string> => {
        const prompt = language === "EN" ? 
          "Generate a simple English sentence for a child." : 
          "Хүүхдэд уншихад энгийн Монгол өгүүлбэр үүсгэ.";

        const res = await fetch("https://api.gemini.ai/v1/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          },
          body: JSON.stringify({ prompt, max_tokens: 50 }),
        });

        const data = await res.json() as { text?: string };
        return data.text || "Sample sentence.";
      },

      saveReading: async (
        _: unknown,
        args: { levelId: number; text: string; audioBuffer: string }
      ): Promise<ReadingSession> => {
        const audioKey = `readings/${Date.now()}-${args.levelId}.webm`;

        // convert base64 to Buffer
        const buffer = Buffer.from(args.audioBuffer, "base64");

        await s3.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: audioKey,
          Body: buffer,
          ContentType: "audio/webm",
        }));

        const audioUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${audioKey}`;

        const { accuracy, stars } = calculateAccuracy(args.text, args.text); // mock transcription

        return prisma.readingSession.create({
          data: { text: args.text, audioUrl, accuracy, stars, levelId: args.levelId },
        });
      },
    },
  };
}
