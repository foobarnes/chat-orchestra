import { GenerateButton } from "@/components/buttons/GenerateButton";
const Prompt = dynamic(() => import("@/components/prompt/Prompt") as any, {
  ssr: false,
});
import { PromptTemplateProvider } from "@/components/prompt/PromptTemplateProvider";
import { ResponsesContainer } from "@/components/responses/ResponsesContainer";
import { ResponsesProvider } from "@/components/responses/ResponsesProvider";
import { ValuesInput } from "@/components/variables/ValuesInput";
import { VariablesProvider } from "@/components/variables/VariablesProvider";
import { Flex, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";

function GeneratePage() {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });

  const gridTemplateAreas = isLargeScreen
    ? `"prompt variables"
       "button button"
       "responses responses"`
    : `"prompt"
       "variables"
       "button"
       "responses"`;

  const gridTemplateColumns = isLargeScreen ? "1fr 1fr" : "1fr";
  const gridTemplateRows = isLargeScreen
    ? "max-content max-content auto"
    : "max-content max-content max-content max-content";

  return (
    <PromptTemplateProvider>
      <VariablesProvider>
        <ResponsesProvider>
          <Grid
            templateAreas={gridTemplateAreas}
            gridTemplateRows={gridTemplateRows}
            gridTemplateColumns={gridTemplateColumns}
            minHeight="80vh"
            w="full"
            gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
          >
            <GridItem p="2" py="10" area={"prompt"}>
              <Flex align="start" justify="center" w="full" h="full">
                <Prompt
                />
              </Flex>
            </GridItem>
            <GridItem p="2" py="10" area={"variables"}>
              <Flex align="start" justify="center" w="full" h="full">
                <ValuesInput label="Values" />
              </Flex>
            </GridItem>
            <GridItem p="2" pb="10" area={"button"}>
              <Flex align="center" justify="center" w="full">
                <GenerateButton />
              </Flex>
            </GridItem>
            <GridItem p="2" bg="gray.300" area={"responses"}>
              <Flex w="full" h="full">
                <ResponsesContainer />
              </Flex>
            </GridItem>
          </Grid>
        </ResponsesProvider>
      </VariablesProvider>
    </PromptTemplateProvider>
  );
}

export default GeneratePage;
