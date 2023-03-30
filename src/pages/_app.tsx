import { AppLayout } from "@/components/layouts/AppLayout";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>

    <ClerkProvider {...pageProps}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      </ClerkProvider>
    </ChakraProvider>
  );
}
