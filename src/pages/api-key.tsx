// ApiPage NextJs Page react component with chakra ui
//
// Path: src/pages/api.tsx
import { ApiKeyInput } from "@/components/api/ApiKeyInput";

function ApiKeyPage() {
  return (
    <>
      <ApiKeyInput apiKey="hello12345" />
    </>
  );
}

export default ApiKeyPage;
