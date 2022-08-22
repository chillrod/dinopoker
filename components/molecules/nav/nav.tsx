import { Box, Flex, Grid, GridItem, Link as LinkChakra } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { emitter } from "../../../services/emitter/emitter";
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
              <Link href='/'>
                <LinkChakra>
                  <DinoPoker />
                </LinkChakra>
              </Link>
            </Grid>

            <>
              <Grid
                gap={4}
                gridTemplateColumns={[
                  "repeat(3, auto)",
                  "repeat(3, auto)",
                  "repeat(3, auto)",
                ]}
                alignItems="center"
                justifyItems="end"
              >
                {lang === "pt" && (
                  <LinkChakra
                    href="https://nubank.com.br/pagar/152tv/6xqf3wx7rA"
                    target="_blank"
                  >
                    Donating
                  </LinkChakra>
                )}
                <LinkChakra
                  target="_blank"
                  href="https://github.com/chillrod"
                >
                  Follow me on Github
                </LinkChakra>
                {!id && (
                  <MenuChangeLanguage />
                )}
              </Grid>
            </>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
