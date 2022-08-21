import { Box, Button, Flex, Grid, MenuButton, Menu as MenuChakra, MenuItem, MenuList } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { Menu } from "react-feather";

import { IconButton } from "../../atoms/icon-button/icon-button";
import { MenuRaiseHand } from "../../atoms/menu-raisehand/menu-raisehand";
import { MenuTeam } from "../../atoms/menu-team/menu-team";

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
        <MenuChakra>
          <MenuButton
            as={Button}
            rightIcon={<Menu />}
            color="dino.primary"

          >
          </MenuButton>
          <MenuList bg="dino.base5">
            {[<MenuRaiseHand key={1} />, <MenuTeam key={2} />].map(
              (Component, id) => (
                <Box key={id} mb={2} p={4}>
                  <Flex>{Component}</Flex>
                </Box>
              )
            )}
          </MenuList>
        </MenuChakra>
      </Grid>
    </>
  );
};
