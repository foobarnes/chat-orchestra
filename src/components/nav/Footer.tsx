import { Flex, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      p={4}
      justify="space-between"
      align="center"
      flexDir={{ base: "column", md: "row" }}
    >
      <Text>
        Made with ❤️ by Chandler Barnes — ChatOrchestra ©
        {new Date().getFullYear()}
      </Text>
      <Flex>
        <Link href="#">Terms of Service</Link>
        <Text mx={2}>|</Text>
        <Link href="#">Privacy Policy</Link>
      </Flex>
    </Flex>
  );
}
