import { useState } from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Grid } from "@chakra-ui/react";

import { BaseBox } from "../../components/atoms/base-box/base-box";
import { IconButton } from "../../components/atoms/icon-button/icon-button";

import { MenuRoomConfig } from "../../components/molecules/menu-roomconfig/menu-roomconfig";
import { MenuRestart } from "../../components/molecules/menu-restart/menu-restart";
import { MenuShare } from "../../components/molecules/menu-share/menu-share";
import { MenuRoomLeave } from "../../components/molecules/menu-roomleave/menu-roomleave";
import { MenuMessages } from "../../components/molecules/menu-messages/menu-messages";

export const Menu = () => {
  const [closed, setClosed] = useState(true);

  return (
    <>
      <BaseBox>
        <Grid h="100%" templateRows="auto 1fr" justifyItems="center">
          <Flex flexDirection="column" gap={1}>
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
              </>
            )}
          </Flex>
          <Box
          py={6}
            alignSelf="end"
            sx={{
              transform: "rotate(180deg)",
            }}
          >
            <Text
              fontSize="xl"
              sx={{
                writingMode: "vertical-lr",
                textOrientation: "mixed",
              }}
            >
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
      </BaseBox>
    </>
  );
};
