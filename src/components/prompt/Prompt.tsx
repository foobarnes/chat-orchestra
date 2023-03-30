import { usePromptTemplate } from "@/components/prompt/PromptTemplateProvider";
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Kbd,
  Text,
  Textarea,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface PromptProps {
  label: string;
  helperText?: string;
  defaultInput?: string;
}

export const Prompt = ({
  label,
  helperText,
  defaultInput = "",
}: PromptProps) => {
  // const [promptTemplate, setPromptTemplate] = useState<string>(defaultInput);
  const { promptTemplate, setPromptTemplate } = usePromptTemplate();
  const { onCopy, hasCopied } = useClipboard(promptTemplate);
  const [highlightedPromptValue, setHighlightedPromptValue] =
    useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertClick = useCallback(() => {
    setPromptTemplate((oldPromptValue) => `${oldPromptValue}{input}`);
    textareaRef.current?.focus();
  }, [textareaRef, setPromptTemplate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptTemplate(event.target.value);
  };

  const isMac = useMemo(
    () =>
      typeof window !== "undefined"
        ? navigator.platform.toUpperCase().indexOf("MAC") >= 0
        : false,
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        handleInsertClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleInsertClick]);

  useEffect(() => {
    const newHighlightedPromptValue = promptTemplate.replace(
      /{input}/g,
      `<span style="background-color: yellow;">{input}</span>`
    );
    setHighlightedPromptValue(newHighlightedPromptValue);
  }, [promptTemplate]);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card
      bg={bgColor}
      px={4}
      py={2}
      mx={3}
      rounded="md"
      borderWidth="1px"
      borderColor={borderColor}
      w="full"
    >
      <FormControl>
        <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} mb="1">
          {label}
        </Heading>
        {helperText && (
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="light" mb="4">
            {helperText}
          </Text>
        )}
        <Textarea
          value={promptTemplate}
          onChange={handleInputChange}
          placeholder='Enter your prompt template here —ex. "Write a poem for {input}."'
          resize="none"
          rows={10}
          mb={2}
          ref={textareaRef}
        />
        <Flex justify="flex-end">
          <Button variant="solid" bg="gray.300" size="sm" onClick={handleInsertClick} mr={2}>
            <Flex align="center">
              Insert Input&nbsp;&nbsp;(<Kbd>{isMac ? "⌘" : "Ctrl"} </Kbd>&nbsp;+&nbsp;<Kbd>K</Kbd>)
            </Flex>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            isDisabled={!promptTemplate}
          >
            {hasCopied ? "Copied!" : "Copy"}
          </Button>
        </Flex>
      </FormControl>
    </Card>
  );
};
