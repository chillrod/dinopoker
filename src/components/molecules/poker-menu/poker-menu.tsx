import { useState } from "react";

import { Menu } from "react-feather";

import { Box, Flex, Text, Grid, Tooltip, GridItem } from "@chakra-ui/react";

import { IconButton } from "../../atoms/icon-button/icon-button";

import { DinoPoker } from "../../atoms/dinopoker";

import { useTranslation } from "react-i18next";
import { MenuShare } from "../../atoms/menu-share/menu-share";
import { MenuRestart } from "../../atoms/menu-restart/menu-restart";
import { MenuRaiseHand } from "../../atoms/menu-raisehand/menu-raisehand";

export const PokerMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid
        h="100%"
        templateColumns="1fr"
        templateRows="1fr 1fr"
        alignItems="center"
        p={2}
      >
        <GridItem alignSelf="start">
          <Flex gap={4} direction="column">
            {[<MenuRaiseHand />].map((Component, id) => (
              <Box key={id}>{Component}</Box>
            ))}
          </Flex>
        </GridItem>
        <GridItem alignSelf="end">
          <Flex></Flex>
        </GridItem>
        <GridItem alignSelf="end" py={2}>
          <Flex>
            <Box
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
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};
