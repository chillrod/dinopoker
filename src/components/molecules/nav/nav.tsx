import { Box, Flex } from "@chakra-ui/react";
import { DinoPoker } from "../../atoms/dinopoker";
import { MenuChangeLanguage } from "../menu-changelanguage/menu-changelanguage";

export const Nav = () => {
  return (
    <Box as="nav">
      <Flex justifyContent="center" alignItems="center">
        <DinoPoker />
        <MenuChangeLanguage />
      </Flex>
    </Box>
  );
};
