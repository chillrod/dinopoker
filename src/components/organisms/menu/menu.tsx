import { Box, Flex, Grid } from "@chakra-ui/react";

import { MenuRoomConfig } from "../../molecules/menu-roomconfig/menu-roomconfig";
import { MenuRestart } from "../../molecules/menu-restart/menu-restart";
import { MenuShare } from "../../molecules/menu-share/menu-share";
import { MenuRoomLeave } from "../../molecules/menu-roomleave/menu-roomleave";
import { MenuMessages } from "../../molecules/menu-messages/menu-messages";
import { DinoPoker } from "../../atoms/dinopoker";

import { useTranslation } from "react-i18next";
import { MenuChangeLanguage } from "../../molecules/menu-changelanguage/menu-changelanguage";

export const Menu = () => {
  return (
    <>
      <Grid templateColumns="auto 1fr" alignItems="center">
        <Box py={2} alignSelf="end">
          <DinoPoker justify="start" />
        </Box>
        <Flex gap={2}>
          <MenuChangeLanguage />
          <MenuShare />
          <MenuMessages />
          <MenuRestart />
          <MenuRoomConfig />
          <MenuRoomLeave />
        </Flex>
      </Grid>
    </>
  );
};
