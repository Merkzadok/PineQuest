import { OpenAI } from "openai";
import { ReadStream } from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function transcribeAudio(fileStream: ReadStream): Promise<string> {
  const transcription = await openai.audio.transcriptions.create({
    file: fileStream,
    model: "whisper-1",
  });

  return transcription.text;
}
