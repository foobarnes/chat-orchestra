import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import { NavBar } from "@/components/nav/NavBar";
import { NavTabsBar } from "@/components/nav/NavTabsBar";
import { Footer } from "@/components/nav/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <NavTabsBar />
      <Box maxW="1500px" mx="auto" px={4} py={8}>
        {children}
      </Box>
      <Box as="footer" bg="gray.100" py={4}>
        <Box maxW="1200px" mx="auto" textAlign="center">
          <Footer />
        </Box>
      </Box>
    </>
  );
};
