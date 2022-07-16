import {
  Box,
  Flex,
  Grid,
  GridItem,
  Link as LinkChakra,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "../../atoms/button/button";
import { DinoPoker } from "../../atoms/dinopoker";
import { MenuChangeLanguage } from "../menu-changelanguage/menu-changelanguage";
import { PokerMenu } from "../poker-menu/poker-menu";

export const Nav = () => {
  const router = useRouter();
  const { t, lang } = useTranslation("common");

  const { id } = router.query;

  return (
    <Box as="nav" height="auto" p={6}>
      <Grid templateColumns="1fr auto" alignItems="center">
        <GridItem>
          <Flex justifyContent="space-between" alignItems="center">
            <Grid gap={4} gridTemplateColumns="repeat(2, auto)">
              <DinoPoker />
            </Grid>

            {!id && (
              <>
                <Grid
                  gap={4}
                  gridTemplateColumns={[
                    "repeat(3, auto)",
                    "repeat(3, auto)",
                    "repeat(4, auto)",
                  ]}
                  alignItems="center"
                  justifyItems="end"
                >
                  {lang === "pt" && (
                    <Link href="/pricing">
                      <LinkChakra>Donating</LinkChakra>
                    </Link>
                  )}
                  <LinkChakra
                    target="_blank"
                    href="https://github.com/chillrod"
                  >
                    Follow me on Github
                  </LinkChakra>
                  <MenuChangeLanguage />
                  <Box display={["none", "none", "none", "block"]}>
                    <Button>{t("home.play-poker")}</Button>
                  </Box>
                </Grid>
              </>
            )}
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
