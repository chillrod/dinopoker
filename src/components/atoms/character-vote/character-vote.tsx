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

import { IPlayerData } from "../../organisms/dto/playerdata";

import { characters } from "../../organisms/home/characters";

export const CharacterVote = ({
  character,
  name,
  vote,
  voteStatus,
}: IPlayerData) => {
  const parseToolTip = (voteStatus?: string, vote?: number | null) => {
    if (voteStatus === "REVELEAD") return `${vote}`;

    if (voteStatus === "THINKING") return "Not voted yet";

    if (voteStatus === "SECRET") return "Voted! But is a secret";
  };
  return (
    <Button
      _hover={{
        backgroundColor: "dino.base2",
      }}
      size="xs"
      bg="dino.base1"
      // outline={raiseHand ? "2px  goldenrod solid" : ""}
      width="100%"
      height="100%"
    >
      <Grid gap={2} templateColumns="1fr 1fr" templateRows="auto 1fr">
        <GridItem justifySelf="center" gridColumn="1 / -1" gridRow={1}>
          <Box>
            <Text fontSize="md">{name}</Text>
          </Box>
        </GridItem>
        <GridItem gridColumn="1 / -1" gridRow={2}>
          <Box
            sx={{
              display: "grid",
            }}
            bg="dino.text"
            width="100%"
            h="100%"
            borderRadius="full"
          >
            <Img src={characters[character].src} boxSize="100%" />
          </Box>
        </GridItem>
        <GridItem gridColumn={2} gridRow={2} justifySelf="end" alignSelf="end">
          <Badge
            width="2.2em"
            height="2.2em"
            bg="dino.primary"
            size="md"
            borderRadius="full"
          >
            <Tooltip label={parseToolTip(voteStatus, vote)}>
              <Text
                textAlign="center"
                sx={{
                  position: "relative",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                fontSize="lg"
              >
                {voteStatus === "THINKING" && "🤔"}
                {voteStatus === "SECRET" && "🤫"}
                {voteStatus === "REVEALED" && `${vote}`}
              </Text>
            </Tooltip>
          </Badge>
        </GridItem>
      </Grid>
    </Button>
  );
};
