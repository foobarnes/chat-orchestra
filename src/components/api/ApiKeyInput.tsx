import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";

type ApiKeyInputProps = {
  apiKey: string;
};

export const ApiKeyInput = ({ apiKey }: ApiKeyInputProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const { hasCopied, onCopy } = useClipboard(apiKey);

  const toggleShowApiKey = () => {
    setShowApiKey((prevShowApiKey) => !prevShowApiKey);
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={showApiKey ? "text" : "password"}
        placeholder="Enter API key"
        value={apiKey}
        isReadOnly
      />
      <InputRightElement width="max-content" gap="0.25rem" pr="0.5rem">
        <IconButton
          h="1.75rem"
          size="sm"
          aria-label={showApiKey ? "Hide API key" : "Show API key"}
          icon={showApiKey ? <FaEyeSlash /> : <FaEye />}
          onClick={toggleShowApiKey}
        />
        <IconButton
          h="1.75rem"
          size="sm"
          aria-label={hasCopied ? "API key copied!" : "Copy API key"}
          icon={<FaCopy />}
          onClick={onCopy}
        />
      </InputRightElement>
    </InputGroup>
  );
};
