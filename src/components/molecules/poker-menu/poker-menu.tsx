import { Flex, Grid, GridItem } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { MenuRaiseHand } from "../../atoms/menu-raisehand/menu-raisehand";
import { MenuTeam } from "../../atoms/menu-team/menu-team";

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
        <GridItem alignSelf="start" py={2}>
          <Flex gap={7} direction="column">
            {[<MenuRaiseHand />, <MenuTeam />].map((Component, id) => (
              <Flex w="100%" key={id}>
                {Component}
              </Flex>
            ))}
          </Flex>
        </GridItem>
        <GridItem alignSelf="end">
          <Flex></Flex>
        </GridItem>
      </Grid>
    </>
  );
};
