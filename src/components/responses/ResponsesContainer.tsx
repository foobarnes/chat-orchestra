import { useResponses } from "@/components/responses/ResponsesProvider";
import { Box, Flex, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { ResponseCard } from "./ResponseCard";

interface ResponsesContainerProps {}

export const ResponsesContainer: FC<ResponsesContainerProps> = () => {
  const { responses, areResponsesLoading } = useResponses();

  // Determine the number of columns based on the screen size
  const numColumns = useBreakpointValue({ base: 1, md: 2 }) || 1;

  // Split the responses into an array of arrays based on the number of columns
  const responsesArray = Array.from({ length: numColumns }, (_, index) =>
    responses.slice(
      (responses.length / numColumns) * index,
      (responses.length / numColumns) * (index + 1)
    )
  );

  if (areResponsesLoading) {
    return (
      <Flex align="center" justify="center" h="full">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (responses.length === 0) {
    return (
      <Flex align="center" justify="center" h="full">
        <Text fontSize="lg" fontWeight="bold">
          No responses yet.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex w="full">
      {responsesArray.map((responses, index) => (
        <Box
          key={index}
          flex="1"
          maxW={numColumns === 1 ? "100%" : "50%"}
          // mr={numColumns === 1 ? 0 : 2}
        >
          <Flex direction="column" w="full" p={3} h="full" gap={6}>
            {responses.map((response, index) => (
              <ResponseCard key={index} {...response} />
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};
