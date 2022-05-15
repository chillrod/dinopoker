import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  Img,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import { IPlayerData } from "../../organisms/dto/playerdata";

import { characters } from "../../organisms/home/characters";

type IVoteStatus = {
  [voteStatus: string]: string;
  SECRET: string;
  THINKING: string;
  REVELEAD: string;
};

export const CharacterVote = ({ character, name, vote }: IPlayerData) => {
  const { t } = useTranslation();

  return (
    <Button
      role="@dino-charactevote"
      size="xs"
      // outline={raiseHand ? "2px  goldenrod solid" : ""}
      width="100%"
      height="100%"
    >
      <Grid gap={2} templateColumns="1fr 1fr" templateRows="auto 1fr">
        <GridItem justifySelf="center" gridColumn="1 / -1" gridRow={1}>
          <Box>
            <Tooltip label={name}>
              <Text maxWidth={16} isTruncated fontSize="md">
                {name}
              </Text>
            </Tooltip>
          </Box>
        </GridItem>
        <GridItem gridColumn="1 / -1" gridRow={2} order={0}>
          <Box bg="dino.text" width="100%" h="100%" borderRadius="full">
            <Img src={characters[character].src} boxSize="100%" p={2} />
          </Box>
        </GridItem>
        <GridItem
          gridColumn={2}
          gridRow={2}
          order={2}
          justifySelf="end"
          alignSelf="end"
        >
          <Badge
            width="2.5em"
            height="2.5em"
            bg="dino.primary"
            size="md"
            borderRadius="full"
          >
            <Text
              textAlign="center"
              sx={{
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              fontSize="lg"
            >
              ?
            </Text>
          </Badge>
        </GridItem>
      </Grid>
    </Button>
  );
};
