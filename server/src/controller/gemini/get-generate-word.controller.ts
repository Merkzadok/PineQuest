import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";

export const getSentence = async (req: Request, res: Response) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
};
