import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { NavBar } from "@/components/nav/NavBar";
import { NavTabsBar } from "@/components/nav/NavTabsBar";
import { Footer } from "@/components/nav/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: LayoutProps) => {
  return (
    <Flex minH="calc(100vh)" w="full" flexDirection="column">
      <Flex w="full" flexDirection="column">
        <NavBar />
        <NavTabsBar />
      </Flex>

      <Flex
        maxW="1500px"
        h="full"
        w="full"
        flex="1"
        mx="auto"
        px={4}
        py={8}
        // align="center"  
        justify="center"
      >
        {children}
      </Flex>
      <Box as="footer" bg="gray.100" py={4}>
        <Box maxW="1200px" mx="auto" textAlign="center">
          <Footer />
        </Box>
      </Box>
    </Flex>
  );
};
