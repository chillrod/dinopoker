import { Flex, Grid } from "@chakra-ui/react";
import { Menu } from "react-feather";

import { useTranslation } from "react-i18next";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { MenuRaiseHand } from "../../atoms/menu-raisehand/menu-raisehand";
import { MenuTeam } from "../../atoms/menu-team/menu-team";
import { MenuChangeLanguage } from "../menu-changelanguage/menu-changelanguage";

export const PokerMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid
        bg="gray.700"
        p={2}
        borderRadius="md"
        display={["none", "none", "block"]}
      >
        <Flex gap={7}>
          {[<MenuRaiseHand />, <MenuTeam />, <MenuChangeLanguage />].map(
            (Component, id) => (
              <div key={id}>
                <Flex key={id}>{Component}</Flex>
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
