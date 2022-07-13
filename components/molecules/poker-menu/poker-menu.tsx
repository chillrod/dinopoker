import { Flex, Grid } from "@chakra-ui/react";
import { Menu } from "react-feather";

import useTranslation from "next-translate/useTranslation";

import { IconButton } from "../../atoms/icon-button/icon-button";
import { MenuRaiseHand } from "../../atoms/menu-raisehand/menu-raisehand";
import { MenuTeam } from "../../atoms/menu-team/menu-team";

export const PokerMenu = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Grid
        bg="gray.700"
        p={2}
        borderRadius="md"
        display={["none", "none", "block"]}
      >
        <Flex gap={7}>
          {[<MenuRaiseHand key={1} />, <MenuTeam key={2} />].map(
            (Component, id) => (
              <div key={id}>
                <Flex>{Component}</Flex>
              </div>
            )
          )}
        </Flex>
      </Grid>
      <Grid display={["block", "block", "none"]}>
        <IconButton
          ariaLabel={t("components.open-menu")}
          icon={<Menu />}
        ></IconButton>
      </Grid>
    </>
  );
};