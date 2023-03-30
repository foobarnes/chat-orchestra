import { createContext, FC, ReactNode, useContext, useState } from "react";

interface ResponsesContextProps {
  responses: { variable: string; response: string }[];
  setResponses: React.Dispatch<
    React.SetStateAction<{ variable: string; response: string }[]>
  >;
  areResponsesLoading: boolean;
  setAreResponsesLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResponsesProviderProps {
  children: ReactNode;
}

const ResponsesContext = createContext<ResponsesContextProps>({
  responses: [],
  setResponses: () => {},
  areResponsesLoading: false,
  setAreResponsesLoading: () => {},
});

export const ResponsesProvider: FC<ResponsesProviderProps> = ({ children }) => {
  const [responses, setResponses] = useState<
    { variable: string; response: string }[]
  >([]);
  const [areResponsesLoading, setAreResponsesLoading] = useState(false);

  return (
    <ResponsesContext.Provider
      value={{
        responses,
        setResponses,
        areResponsesLoading,
        setAreResponsesLoading,
      }}
    >
      {children}
    </ResponsesContext.Provider>
  );
};

export const useResponses = () => useContext(ResponsesContext);
