import { Flex, Box, useColorModeValue, styled } from "@chakra-ui/react";
import { FaHome, FaSearch, FaHeart, FaUser } from "react-icons/fa";

interface NavTabsBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const NavTabsBar = ({ activeTab, onTabChange=()=>{} }: NavTabsBarProps) => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const iconColor = useColorModeValue("gray.500", "gray.300");
  const activeIconColor = useColorModeValue("teal.500", "teal.200");
  const textColor = useColorModeValue("gray.500", "gray.300");
  const activeTextColor = useColorModeValue("teal.500", "teal.200");

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: <FaHome size={20} color={iconColor} />,
    },
    {
      id: "search",
      label: "Search",
      icon: <FaSearch size={20} color={iconColor} />,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <FaHeart size={20} color={iconColor} />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <FaUser size={20} color={iconColor} />,
    },
  ];

  return (
    <Flex
      bg={bgColor}
      px={4}
      py={2}
      position="sticky"
      top="0"
      zIndex={1}
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      align="center"
    >
      {tabs.map((tab) => (
        <Box
          key={tab.id}
          display="flex"
          alignItems="center"
          p={2}
          borderBottom={activeTab === tab.id ? "2px solid" : "none"}
          borderColor={activeTab === tab.id ? activeTextColor : "transparent"}
          color={activeTab === tab.id ? activeTextColor : textColor}
          _hover={{ cursor: "pointer", color: activeTextColor }}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon}
          <Box ml={2}>{tab.label}</Box>
        </Box>
      ))}
    </Flex>
  );
};
