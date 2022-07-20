import { Flex, Grid } from "@chakra-ui/react";
import { Menu } from "react-feather";

import useTranslation from "next-translate/useTranslation";

import { IconButton } from "../../../components/atoms/icon-button/icon-button";
import { MenuRaiseHand } from "./menu-raisehand";
import { MenuTeam } from "./menu-team";

export const PokerMenu = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Grid borderRadius="md" display={["none", "none", "block"]}>
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
