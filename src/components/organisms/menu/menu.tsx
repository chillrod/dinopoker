import { useState } from "react";

import { HamburgerIcon, LockIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Grid, Tooltip } from "@chakra-ui/react";

import { BaseBox } from "../../atoms/base-box/base-box";
import { IconButton } from "../../atoms/icon-button/icon-button";

import { MenuRoomConfig } from "../../molecules/menu-roomconfig/menu-roomconfig";
import { MenuRestart } from "../../molecules/menu-restart/menu-restart";
import { MenuShare } from "../../molecules/menu-share/menu-share";
import { MenuRoomLeave } from "../../molecules/menu-roomleave/menu-roomleave";
import { MenuMessages } from "../../molecules/menu-messages/menu-messages";
import { emitter } from "../../../service/emitter/emitter";
import { DinoPoker } from "../../atoms/dinopoker";

import { useTranslation } from "react-i18next";

export const Menu = () => {
  const [closed, setClosed] = useState(true);

  const { t } = useTranslation();

  const resetPlayers = () => {
    emitter.emit("EMIT_MESSAGEBOX", {
      message: t("round.danger-reset-players"),
      func: "RESET_ACTION",
    });
  };

  return (
    <>
      <Grid templateColumns="auto 1fr" p={1} alignItems="center">
        <Flex gap={1}>
          <Box mx={3}>
            <IconButton
              onClick={() => setClosed(!closed)}
              ariaLabel={closed ? t("components.open-menu") : t("components.close-menu")}
              icon={<HamburgerIcon />}
            />
            {!closed && (
              <>
                <MenuShare />
                <MenuMessages />
                <MenuRestart />
                <MenuRoomConfig />
                <MenuRoomLeave />
                <IconButton
                  icon={<LockIcon />}
                  ariaLabel={t("round.danger-reset-players")}
                  onClick={() => resetPlayers()}
                />
              </>
            )}
          </Box>
        </Flex>
        <Box py={2} alignSelf="end">
          <DinoPoker justify="start" />
        </Box>
      </Grid>
    </>
  );
};
