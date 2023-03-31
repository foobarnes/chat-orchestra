// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TestCredentialsRequest {
  apiKey: string;
}

type TestCredentialsResponse = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestCredentialsResponse>
) {
  const { apiKey } = req.body as TestCredentialsRequest;

  if (apiKey) {
    const existingApiKey = await prisma.userApiKey.findUnique({
      where: {
        apiKey: apiKey,
      },
    });
    if (!existingApiKey) {
      res.status(401).json({ error: "Invalid API key" });
      return;
    } else {
      res.status(200).json({ message: "API key is valid" });
      return;
    }
    // TODO: Check if API key is valid with subscription?
  }
  res.status(400).json({ error: "No API key provided" });
}
