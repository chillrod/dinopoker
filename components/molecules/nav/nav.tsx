import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Link as LinkChakra,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { emitter } from "../../../services/emitter/emitter";
import { DinoPoker } from "../../atoms/dinopoker";
import { MenuChangeLanguage } from "../menu-changelanguage/menu-changelanguage";
import { PokerMenu } from "../poker-menu/poker-menu";
import { Button } from "../../atoms/button/button";

export const Nav = () => {
  const router = useRouter();
  const { t, lang } = useTranslation("common");

  const { id } = router.query;

  return (
    <Box px={4} position="sticky" top={0} zIndex={10}>
      <Flex h={16} alignItems={"center"} justifyContent={id ? 'space-between' : "center"}>
        <Box>
          <Link href="/">
            <LinkChakra>
              <DinoPoker />
            </LinkChakra>
          </Link>
        </Box>
        {id && <PokerMenu />}
      </Flex>
    </Box>
  );
};
