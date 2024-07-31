import { Box, Flex, Link as LinkChakra } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { DinoPoker } from "../../atoms/dinopoker";
import { PokerMenu } from "../poker-menu/poker-menu";
import Image from "next/image";

export const Nav = () => {
  const router = useRouter();
  const { t, lang } = useTranslation("common");

  const { id } = router.query;

  return (
    <Box
      px={4}
      position="sticky"
      top={0}
      zIndex={10}
      background="dino.base5"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(5px)"
      border="1px solid rgba(255, 255, 255, 0.3"
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={id ? "space-between" : "center"}
      >
        <Box>
          <Link href="/">
            <LinkChakra display="flex" alignItems="center" gap={2}>
              <Image src="/dino3.svg" alt="Dino Poker" width={40} height={40} />
              <DinoPoker />
            </LinkChakra>
          </Link>
        </Box>
        {id && <PokerMenu />}
      </Flex>
    </Box>
  );
};
