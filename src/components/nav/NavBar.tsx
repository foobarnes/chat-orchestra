import {
  Box,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const NavBar = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.100");

  return (
    <Flex bg={bgColor} p={4} w="full" align="center">
      <Box>
        <Heading size="md" color={textColor}>
          parallel||chat
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton showName appearance={{}} />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton />
        </SignedOut>
      </Box>
    </Flex>
  );
};
