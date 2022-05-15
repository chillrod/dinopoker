import { useEffect, useState } from "react";

import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";

import { Button } from "../../atoms/button/button";
import { CharacterVote } from "../../atoms/character-vote/character-vote";

import { IPlayerData } from "../../organisms/dto/playerdata";
import { emitter } from "../../../service/emitter/emitter";
import { RoomService } from "../../../service/room/room.service";

import { useTranslation } from "react-i18next";

export const PokerTable = () => {
  const { t } = useTranslation();

  const [roomPlayers, setRoomPlayers] = useState<IPlayerData[]>([]);

  const renderTableMargin = (index: number) => {
    if (index === 0 || index === 5) return "2.5em 0 2.5em 0";
    if (index === 6 || index === 11) return "-2.5em 0 -2.5em 0";
  };

  const revealVote = () => {
    RoomService.setRevealVote("reveal");
  };

  const restartVote = () => {
    RoomService.setRestartAction("restart");
  };

  useEffect(() => {
    emitter.on("ROOM_PLAYERS", (data) => setRoomPlayers(data));
  }, []);

  return (
    <>
      {/* <Center>
        {roomPlayers[0]?.voteStatus !== "REVEALED" && (
          <Button onClick={() => revealVote()} action="confirm">
            {t("round.reveal-vote")}
          </Button>
        )}

        {roomPlayers[0]?.voteStatus === "REVEALED" && (
          <Button onClick={() => restartVote()} action="confirm">
            {t("round.restart-votes")}
          </Button>
        )}
      </Center> */}
      <Grid templateColumns="1fr">
        <GridItem
          gridRow={1}
          gridColumn={1}
          alignSelf="start"
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
          {roomPlayers?.length && (
            // <SimpleGrid gap={2}>
            //   {roomPlayers.map((player, index) => (
            //     <Box
            //       w="8ch"
            //       h="11ch"
            //       key={player.id}
            //       sx={{
            //         margin: renderTableMargin(index),
            //       }}
            //     >
            //       <CharacterVote
            //         character={player.character}
            //         name={player.name}
            //         vote={player.vote}
            //         voteStatus={player.voteStatus}
            //       />
            //     </Box>
            //   ))}
            //   </SimpleGrid>
            <SimpleGrid gap={2} columns={6} mt={3}>
              {roomPlayers.map((player, index) => (
                <Box
                  w="8ch"
                  h="11ch"
                  key={player.clientId}
                  sx={{
                    margin: renderTableMargin(index),
                  }}
                >
                  <CharacterVote
                    character={player.character}
                    name={player.name}
                    vote={player.vote}
                    room={player.room}
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
        ></GridItem>
        <GridItem
          gridRow={1}
          gridColumn={1}
          p={9}
          sx={{
            zIndex: 1,
          }}
        >
          <Box
            bg="dino.base3"
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
