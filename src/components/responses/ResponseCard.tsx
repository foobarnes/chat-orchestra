import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Text,
  useClipboard,
} from "@chakra-ui/react";

interface ResponseCardProps {
  variable: string;
  response: string;
}

export function ResponseCard({ variable, response }: ResponseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { hasCopied, onCopy } = useClipboard(response);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card borderRadius="0.5rem" boxShadow="md">
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottomWidth="1px"
        borderBottomColor="gray.100"
        paddingX={4}
        paddingY={2}
      >
        <Text fontSize="lg" fontWeight="bold">
          {variable}
        </Text>
        <Box display="flex" alignItems="center">
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={toggleExpanded}
          >
            {expanded ? "Collapse" : "Expand"}
          </Button>
          <Button size="sm" marginLeft={2} onClick={onCopy}>
            {hasCopied ? "Copied!" : "Copy"}
          </Button>
        </Box>
      </CardHeader>
      <CardBody padding={4}>
        <Box
          as="pre"
          whiteSpace={expanded ? "pre-wrap" : "nowrap"}
          overflow={expanded ? "auto" : "hidden"}
          textOverflow={expanded ? "unset" : "ellipsis"}
          border="1px solid"
          borderColor="gray.100"
          borderRadius="0.5rem"
          backgroundColor="gray.50"
          padding={2}
          fontSize="1rem"
          onClick={toggleExpanded}
          cursor="pointer"
        >
          {response}
        </Box>
      </CardBody>
    </Card>
  );
}
