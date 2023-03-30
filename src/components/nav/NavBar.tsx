import {
  Flex,
  Box,
  Heading,
  Spacer,
  Link,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export const NavBar = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.100");

  return (
    <Flex bg={bgColor} p={4} align="center">
      <Box>
        <Heading size="md" color={textColor}>
          ChatOrchestra
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Link mx={2} href="#" color={textColor}>
          Link 1
        </Link>
        <Link mx={2} href="#" color={textColor}>
          Link 2
        </Link>
        <Button mx={2} colorScheme="teal">
          Sign Up
        </Button>
      </Box>
    </Flex>
  );
};
