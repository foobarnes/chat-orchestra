import { usePromptTemplate } from "@/components/prompt/PromptTemplateProvider";
import { useResponses } from "@/components/responses/ResponsesProvider";
import { useVariables } from "@/components/variables/VariablesProvider";
import {
  Box,
  Button,
  ButtonProps,
  Icon,
  useStyleConfig,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

interface GenerateButtonProps extends ButtonProps {
  onClick?: () => void;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick = () => {},
  ...props
}) => {
  const { promptTemplate } = usePromptTemplate();
  const { variables } = useVariables();
  const { setResponses, areResponsesLoading, setAreResponsesLoading } =
    useResponses();

  const [error, setError] = useState<string | null>(null);
  const styles = useStyleConfig("Button", {
    size: "lg",
    variant: "solid",
    colorScheme: "green",
  });

  const handleGenerateClick = async () => {
    setAreResponsesLoading(true);
    setError(null);

    try {
      const values = variables.map((v) => v.value);
      const response = await fetch("/api/batch-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptTemplate,
          variables: values,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${
            response.status
          }: ${await response.text()}`
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      setResponses(responseData.responses);
      return responseData.responses;
    } catch (error) {
      console.error("API request failed:", error);
      setError("Failed to generate responses. Please try again.");
    } finally {
      setAreResponsesLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGenerateClick}
      isLoading={areResponsesLoading}
      loadingText="Generating..."
      isDisabled={
        areResponsesLoading || !promptTemplate || variables.length === 0
      }
      rounded="full"
      minWidth="10rem"
      height="4rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
      sx={{
        ...styles,
        _hover: {
          bg: "green.400",
          boxShadow: "none",
        },
        _active: {
          bg: "green.500",
          boxShadow: "none",
        },
        fontSize: "2xl",
        p: "8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box as="span" display="flex" alignItems="center">
        <Icon as={MdAdd} color="white" boxSize={6} />
        <Box as="span" ml={2} fontWeight="bold">
          Generate
        </Box>
      </Box>
      {error && (
        <Box ml={2} color="red">
          {error}
        </Box>
      )}
    </Button>
  );
};
