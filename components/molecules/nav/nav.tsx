import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { Button } from "../../atoms/button/button";
import { DinoPoker } from "../../atoms/dinopoker";
import { MenuChangeLanguage } from "../menu-changelanguage/menu-changelanguage";
import { PokerMenu } from "../poker-menu/poker-menu";

export const Nav = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { id } = router.query;

  return (
    <Box as="nav" height="auto" px={6} pt={6}>
      <Grid templateColumns="1fr auto" alignItems="center">
        <GridItem>
          <Flex justifyContent="space-between" alignItems="center">
            <Grid gap={4} gridTemplateColumns="repeat(2, auto)">
              <DinoPoker />
              {!id && <MenuChangeLanguage />}
            </Grid>

            {/* {!id && (
              <Grid gap={4} gridTemplateColumns="repeat(2, auto)">
                <Button>{t("home.play-poker")}</Button>
              </Grid>
            )} */}
          </Flex>
        </GridItem>
        {id && (
          <GridItem justifySelf="end">
            <PokerMenu />
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};
