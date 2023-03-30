import { createContext, useState, useContext, FC, ReactNode } from "react";

interface VariablesContextProps {
  variables: { value: string; color: string }[];
  setVariables: React.Dispatch<
    React.SetStateAction<{ value: string; color: string }[]>
  >;
  removeVariable: (variable: string) => void;
}

interface VariablesProviderProps {
  children: ReactNode;
}

export const VariablesContext = createContext<VariablesContextProps>({
  variables: [],
  setVariables: () => {},
  removeVariable: () => {},
});

export const VariablesProvider: FC<VariablesProviderProps> = ({
  children,
}) => {
  const [variables, setVariables] = useState<
    { value: string; color: string }[]
  >([]);

  const removeVariable = (variable: string) => {
    setVariables(variables.filter((v) => v.value !== variable));
  };

  return (
    <VariablesContext.Provider
      value={{ variables, setVariables, removeVariable }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariables = (): VariablesContextProps =>
  useContext(VariablesContext);
