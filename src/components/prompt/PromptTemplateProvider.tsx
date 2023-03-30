import { createContext, useState, useContext, FC, ReactNode } from "react";

interface PromptTemplateContextProps {
  promptTemplate: string;
  setPromptTemplate: React.Dispatch<React.SetStateAction<string>>;
}

interface PromptTemplateProviderProps {
  children: ReactNode;
}

export const PromptTemplateContext = createContext<PromptTemplateContextProps>({
  promptTemplate: "",
  setPromptTemplate: () => {},
});

export const PromptTemplateProvider: FC<PromptTemplateProviderProps> = ({ children }) => {
  const [promptTemplate, setPromptTemplate] = useState("");

  return (
    <PromptTemplateContext.Provider
      value={{ promptTemplate, setPromptTemplate }}
    >
      {children}
    </PromptTemplateContext.Provider>
  );
};

export const usePromptTemplate = (): PromptTemplateContextProps =>
  useContext(PromptTemplateContext);
