import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface GenerateRequest {
  prompt: string;
  model: string;
  apiKey: string;
}

interface GenerateResponse {
  response: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    const { prompt, model = "gpt-3.5-turbo" } = req.body as GenerateRequest;
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const completion = await openai.createChatCompletion({
        model,
        messages: [{ role: "user", content: prompt }],
      });
      const response =
        completion?.data?.choices[0]?.message?.content || "No response found.";

      res.status(200).json({ response });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
