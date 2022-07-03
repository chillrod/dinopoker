import { Flex, Grid } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { MenuRaiseHand } from "../../atoms/menu-raisehand/menu-raisehand";
import { MenuTeam } from "../../atoms/menu-team/menu-team";

export const PokerMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid>
        <Flex gap={7}>
          {[<MenuRaiseHand />, <MenuTeam />].map((Component, id) => (
            <div key={id}>
              <Flex w="100%" key={id}>
                {Component}
              </Flex>
            </div>
          ))}
        </Flex>
      </Grid>
    </>
  );
};
