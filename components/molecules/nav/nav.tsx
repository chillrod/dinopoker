import {
  Box,
  Flex,
  Grid,
  GridItem,
  Link as LinkChakra,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";

import { DinoScrum } from "../../dino-scrum";
import { MenuChangeLanguage } from "../menu-changelanguage/menu-changelanguage";

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
              <DinoScrum />
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
                  <MenuChangeLanguage />
                </Grid>
              </>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
