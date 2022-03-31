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

export const Menu = () => {
  const [closed, setClosed] = useState(true);

  const resetPlayers = () => {
    emitter.emit("RESET_ACTION", "RESET");
  };

  return (
    <>
      <Grid templateColumns="auto 1fr" p={1} alignItems="center">
        <Flex gap={1}>
          <Box mx={2}>
            <IconButton
              onClick={() => setClosed(!closed)}
              ariaLabel={closed ? "Open Menu" : "Close Menu"}
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
                  ariaLabel={"DANGEROUS - RESET PLAYERS"}
                  onClick={() => resetPlayers()}
                />
              </>
            )}
          </Box>
        </Flex>
        <Box py={2} alignSelf="end">
          <Text fontSize="sm">
            dino
            <Text
              fontWeight={800}
              as="span"
              sx={{
                color: "dino.primary",
              }}
            >
              poker.app
            </Text>
          </Text>
        </Box>
      </Grid>
    </>
  );
};
