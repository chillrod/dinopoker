import { Box, Flex, GridItem } from "@chakra-ui/react";

import { VoteSystemOptions } from "../../config/vote-system/vote-system";
import { CardPoints } from "../atoms/card-points/card-points";
import { PokerRoundData } from "../molecules/poker-round-data/poker-round-data";
import { PlainTemplate } from "./_plain-template";

export const Poker = () => {


  return (
    <PlainTemplate
      areas={[
        `
        "poker poker poker"
        "poker poker poker"
        "vote vote vote"
        `,
        `
        "poker poker poker"
        "poker poker poker"
        "vote vote vote"
        `,
        `
        "poker poker poker"
        "poker poker poker"
        "vote vote vote"
        `,
        `
        "poker poker poker"
        "poker poker poker"
        "vote vote vote"
        `,
      ]}
      cols={["1fr 1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]}
      rows={["auto auto 1fr", "auto auto 1fr", "auto auto 1fr"]}
    >
      <GridItem
        area="poker"
        h="100%"
        justifyContent="center"
        alignSelf="center"
      >
        <PokerRoundData
          currentPlayers={
            [
              {
                name: "rod Rod",
                team: 1,
                raiseHand: false,
                vote: 2,
              },
            ]
          }
          voteLoading={false}
          roomStatus="REVEALED"
          updateRoomStatus={() => { }}
        />
      </GridItem>
      <GridItem
        area="vote"
        justifySelf="center"
        alignSelf={["center", "center", "center"]}
        p={2}
      >
        <Flex maxW="100vw" overflow="auto">
          {VoteSystemOptions["modified-fibonacci"]?.voteSystem.map(
            (number: number) => (
              <Box key={number} mx={1}>
                <CardPoints
                  onClick={(vote) => console.log(vote)}
                  selected={number === 2}
                  point={number}
                />
              </Box>
            )
          )}
        </Flex>
      </GridItem>
    </PlainTemplate>
  );
};
