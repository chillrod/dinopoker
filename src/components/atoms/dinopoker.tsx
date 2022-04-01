import { AtSignIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import { MenuChangeLanguage } from "../molecules/menu-changelanguage/menu-changelanguage";
import { IconButton } from "./icon-button/icon-button";

interface IDinoPoker {
  justify: string;
}

export const DinoPoker = ({ justify = "start" }: IDinoPoker) => {
  return (
    <Box p={2}>
      <Flex justifyContent={justify} alignItems="center">
        <Heading p={1} textAlign="center" size="md">
          dino {""}
          <Text as="span" color="dino.primary">
            planningpoker
          </Text>
          <Tag mx={1} colorScheme="green">
            beta 0.0.2
          </Tag>
        </Heading>
        <MenuChangeLanguage />
      </Flex>
    </Box>
  );
};
