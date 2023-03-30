import { ApiKeyInput } from "@/components/api/ApiKeyInput";
import { prisma } from "@/utils/db";
import { useAuth } from "@clerk/nextjs";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import { v4 as uuidv4 } from "uuid";

interface ApiKeyPageProps {
  apiKey: string;
}

function ApiKeyPage({ apiKey }: ApiKeyPageProps) {
  const { userId } = useAuth();

  return (
    <>
      <ApiKeyInput apiKey={apiKey} />
    </>
  );
}

function generateApiKey(): string {
  return uuidv4();
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { userId } = getAuth(req);

  let apiKey = "";

  const existingApiKey = await prisma.userApiKey.findUnique({
    where: {
      userId: userId as string,
    },
  });

  // If the user doesn't have an API key, generate a new one and save it in the database
  if (!existingApiKey) {
    let newApiKey = generateApiKey();
    while (
      await prisma.userApiKey.findUnique({
        where: {
          apiKey: newApiKey,
        },
      })
    ) {
      newApiKey = generateApiKey();
    }
    await prisma.userApiKey.create({
      data: {
        userId: userId as string,
        apiKey: newApiKey,
      },
    });

    apiKey = newApiKey;
  } else {
    // If the user already has an API key, use that key
    apiKey = existingApiKey.apiKey;
  }

  return {
    props: {
      apiKey,
      ...buildClerkProps(req),
    },
  };
};

export default ApiKeyPage;
