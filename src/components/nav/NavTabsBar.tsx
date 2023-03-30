import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaFileAlt, FaKey } from "react-icons/fa";

export const NavTabsBar = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const activeTextColor = useColorModeValue("teal.500", "teal.200");
  const router = useRouter();

  const tabs = [
    {
      id: "generate",
      label: "Generate",
      icon: <FaFileAlt size={20} />,
      path: "/generate",
    },
    {
      id: "api-key",
      label: "API Key",
      icon: <FaKey size={20} />,
      path: "/api-key",
    },
    {
      id: "usage",
      label: "Usage",
      icon: <FaKey size={20} />,
      path: "/usage",
    },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(
    tabs.findIndex((tab) => tab.path === router.pathname)
  );

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    router.push(tabs[index].path);
  };

  return (
    <Box bg={bgColor} position="sticky" top="0" zIndex={1}>
      <Tabs
        isLazy
        defaultIndex={activeTabIndex}
        onChange={handleTabChange}
        variant="unstyled"
      >
        <TabList
          borderBottom="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          {tabs.map((tab) => (
            <Tab _selected={{ color: activeTextColor }} key={tab.id}>
              <Box display="flex" alignItems="center">
                {tab.icon}
                <Box ml={2}>{tab.label}</Box>
              </Box>
            </Tab>
          ))}
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="teal.500"
            borderRadius="1px"
          />
        </TabList>
        {/* <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id} py={4}>
              {tab.component}
            </TabPanel>
          ))}
        </TabPanels> */}
      </Tabs>
    </Box>
  );
};
