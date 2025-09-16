
import { OpenAI } from "openai";
import { gql } from "graphql-tag";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../../../uploads");
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

export const typeDefs = gql`
  scalar Upload

  type Reading {
    id: ID!
    text: String!
    accuracy: Float!
    stars: Int!
    audioUrl: String
  }

  type Mutation {
    saveReading(levelId: ID!, text: String!, audioBlob: Upload!): Reading
  }
`;

export const resolvers = {
  Mutation: {
    saveReading: async (_: any, { levelId, text, audioBlob }: any) => {
      // Save file locally
      const { createReadStream, filename } = await audioBlob;
      const filePath = path.join(uploadsDir, filename);

      await new Promise<void>((resolve, reject) => {
        createReadStream()
          .pipe(createWriteStream(filePath))
          .on("finish", resolve)
          .on("error", reject);
      });

      // Transcribe audio with OpenAI Whisper
      const transcription = await openai.audio.transcriptions.create({
        file: createReadStream(filePath),
        model: "whisper-1",
      });

      const transcriptText = transcription.text;

      // Calculate accuracy & stars
      const expectedWords = text.toLowerCase().split(" ");
      const spokenWords = transcriptText.toLowerCase().split(" ");
      const correctWords = spokenWords.filter((w: string) =>
        expectedWords.includes(w)
      ).length;
      const accuracy = Math.min(100, (correctWords / expectedWords.length) * 100);
      const stars = accuracy >= 90 ? 3 : accuracy >= 85 ? 2 : 1;

      // Return Reading object
      return {
        id: levelId,
        text: transcriptText,
        accuracy,
        stars,
        audioUrl: `/uploads/${filename}`,
      };
    },
  },
};
