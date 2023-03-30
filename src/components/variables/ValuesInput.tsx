import { useVariables } from "@/components/variables/VariablesProvider";
import {
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

interface ValuesInputProps {
  label: string;
  placeholder?: string;
}

const tagColors = ["teal", "orange", "purple", "green", "blue"];

export const ValuesInput = ({ label, placeholder }: ValuesInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const { variables, setVariables, removeVariable } = useVariables();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      if (!variables.some((val) => val.value === inputValue.trim())) {
        const randomColor =
          tagColors[Math.floor(Math.random() * tagColors.length)];
        setVariables([...variables, { value: inputValue, color: randomColor }]);
      }
      setInputValue("");
    }
  };

  const handleTagClose = (value: string) => {
    removeVariable(value);
  };

  const handleClearAll = () => {
    setVariables([]);
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card
      bg={bgColor}
      px={4}
      py={2}
      mx={3}
      // my={6}
      rounded="md"
      borderWidth="1px"
      borderColor={borderColor}
      w="full"
    >
      <Heading
        as="h3"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb="4"
        color={textColor}
      >
        {label}
      </Heading>
      <Text
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="light"
        mb="4"
        color={textColor}
      >
        Input your variable values to apply to your template
      </Text>
      <Flex align="center">
        <Input
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          mr={2}
          bg={bgColor}
          color={textColor}
          _placeholder={{ color: "gray.400" }}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="md"
          p={2}
          _hover={{ borderColor: "gray.400" }}
        />
        <Button onClick={handleClearAll} size="sm" colorScheme="red">
          Clear All
        </Button>
      </Flex>
      <Flex flexWrap="wrap" mt={2}>
        {variables.map(({ value, color }) => (
          <Tag key={value} variant="subtle" colorScheme={color} m={1}>
            <TagLabel color={textColor}>{value}</TagLabel>
            <TagCloseButton onClick={() => handleTagClose(value)} />
          </Tag>
        ))}
      </Flex>
    </Card>
  );
};
