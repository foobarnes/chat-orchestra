import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
    } = req.body as BatchGenerateRequest;

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

          responses.push({variable, response});
        })
      );

      res.status(200).json({ responses });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(error.response.status).json({ error: errorMessage });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
