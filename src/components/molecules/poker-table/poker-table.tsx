import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, SimpleGrid } from "@chakra-ui/react";
import { Text, Grid, GridItem, Img } from "@chakra-ui/react";

import { Button } from "../../atoms/button/button";
import { CharacterVote } from "../../atoms/character-vote/character-vote";

import { characters } from "../../organisms/home/characters";

import { IPlayerData } from "../../organisms/dto/playerdata";
import { emitter } from "../../../service/emitter/emitter";
import { socket } from "../../../service/socket";

export const PokerTable = () => {
  const [roomPlayers, setRoomPlayers] = useState<IPlayerData[]>([]);
  const [revealed, setIsRevealed] = useState(false);

  const renderTableMargin = (index: number) => {
    if (index === 0 || index === 5) return "2em 0 2em 0";
    if (index === 6 || index === 11) return "-2em 0 -2em 0";
  };

  const revealVote = () => {
    setIsRevealed(true);
    emitter.emit("REVEAL_VOTE", "REVEAL");
  };

  const restartVotes = () => {
    setIsRevealed(false);
    emitter.emit("RESTART_ACTION", "RESET");
  };

  useEffect(() => {
    emitter.on("ROOM_PLAYERS", (data) => setRoomPlayers(data));
  }, []);

  return (
    <>
      <Grid templateColumns="1fr">
        <GridItem
          gridRow={1}
          gridColumn={1}
          justifySelf="center"
          sx={{
            zIndex: 2,
          }}
        >
          {/* {players.length === 1 && (
            <SimpleGrid spacing={2} justifyContent="center">
              <Text justifySelf="center" fontSize="lg">
                Waiting for players
              </Text>
              <Img
                justifySelf="center"
                src={characters[0].src}
                width="4em"
                height="4em"
              />
              <Box justifySelf="center">
                <Button action="confirm">Share room</Button>
              </Box>
            </SimpleGrid>
          )} */}
          {roomPlayers.length && (
            <SimpleGrid gap={6} columns={6}>
              {roomPlayers.map((player, index) => (
                <Box
                  w="8ch"
                  h="11ch"
                  key={player.id}
                  sx={{
                    margin: renderTableMargin(index),
                  }}
                >
                  <CharacterVote
                    character={player.character}
                    name={player.name}
                    vote={player.vote}
                    voteStatus={player.voteStatus}
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </GridItem>
        <GridItem
          gridRow={1}
          gridColumn={1}
          alignSelf="center"
          justifySelf="center"
          sx={{
            zIndex: 3,
          }}
        >
          {!revealed && (
            <Button onClick={() => revealVote()} action="confirm">
              Reveal vote
            </Button>
          )}

          {revealed && (
            <Button onClick={() => restartVotes()} action="confirm">
              Restart votes
            </Button>
          )}
        </GridItem>
        <GridItem
          gridRow={1}
          gridColumn={1}
          p={9}
          sx={{
            zIndex: 1,
          }}
        >
          <Box
            bg="dino.secondary"
            width="100%"
            minHeight="250px"
            height="100%"
            borderRadius="full"
          ></Box>
        </GridItem>
      </Grid>
    </>
  );
};
