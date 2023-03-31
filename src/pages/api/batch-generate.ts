import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const prisma = new PrismaClient();

interface BatchGenerateRequest {
  promptTemplate: string;
  variables: string[];
  model: string;
  apiKey: string;
}

interface BatchGenerateResponse {
  responses: { variable: string; response: string }[];
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BatchGenerateResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    const {
      promptTemplate,
      variables,
      model = "gpt-3.5-turbo",
      apiKey,
    } = req.body as BatchGenerateRequest;

    if (apiKey) {
      const existingApiKey = await prisma.userApiKey.findUnique({
        where: {
          apiKey: apiKey,
        },
      });
      if (!existingApiKey) {
        res.status(401).json({ error: "Invalid API key" });
        return;
      }
      // TODO: Check if API key is valid with subscription?
    } else {
      const { userId } = getAuth(req);
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
    }

    if (!promptTemplate) {
      res.status(400).json({ error: "Prompt template is required" });
      return;
    }

    if (!variables || variables.length === 0) {
      res.status(400).json({ error: "Variables are required" });
      return;
    }

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const responses: { variable: string; response: string }[] = [];
      await Promise.all(
        variables.map(async (variable) => {
          const prompt = promptTemplate.replace(/\{.*?\}/g, variable);

          const completion = await openai.createChatCompletion({
            model,
            messages: [{ role: "user", content: prompt }],
          });
          const response =
            completion?.data?.choices[0]?.message?.content ||
            "No response found.";

          responses.push({ variable, response });
        })
      );

      //TODO: For each response, log a usage to the database
      res.status(200).json({ responses });
    } catch (error: any) {
      const errorMessage = (error as Error).message;
      res.status(error.response?.status || 500).json({ error: errorMessage });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
