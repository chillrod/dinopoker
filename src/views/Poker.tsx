import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { RoomsService } from "../services/rooms/rooms.service";
import { NotificationsService } from "../services/notifications/notifications.service";

import {
  child,
  getDatabase,
  onDisconnect,
  onValue,
  ref,
} from "firebase/database";
import { app } from "../main";
import { IPlayerData } from "../model/PlayerData";

import { CharacterCard } from "../components/atoms/character-card/character-card";
import { Grid, GridItem, Box, Flex } from "@chakra-ui/react";

import { CardPoints } from "../components/atoms/card-points/card-points";
import { PokerMenu } from "../components/molecules/poker-menu/poker-menu";
import { ChatMessages } from "../components/molecules/chat-messages/chat-messages";

interface IPlayerState {
  player: IPlayerData;
}

export const Poker = () => {
  const { id } = useParams();
  const location = useLocation();

  const state = location.state as IPlayerState;

  const [currentPlayers, setCurrentPlayers] = useState<any>({});

  const retrievePlayerFromRouting = async () => {
    const getCurrentPlayer = JSON.parse(
      localStorage.getItem("character") || ""
    );

    try {
      await RoomsService.updatePlayersFromRoom(getCurrentPlayer.player);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    }
  };

  const renderPlayers = () => {
    const players = Object.keys(currentPlayers).map((key) => {
      return { ...currentPlayers[key] };
    });

    return players;
  };

  const db = getDatabase(app);

  useEffect(() => {
    const roomDbRef = child(ref(db), "dinopoker-room/" + id + "/players");

    const unsubRoomDbRef = onValue(roomDbRef, (data) => {
      setCurrentPlayers({ ...data.val() });
    });

    retrievePlayerFromRouting();

    return () => {
      unsubRoomDbRef();
    };
  }, []);

  useEffect(() => {
    const dbRef = child(
      ref(db),
      "dinopoker-room/" + id + "/players/" + state.player.id
    );

    onDisconnect(dbRef).remove();

    return () => {};
  }, []);

  return (
    <>
      <Box as="section">
        <Grid
          templateColumns="auto 3fr auto"
          height="100vh"
          justifyContent="center"
        >
          <GridItem gridRow="1" gridColumn="1" w="100%" h="100%">
            <PokerMenu />
          </GridItem>
          <GridItem gridColumn="2" bg="dino.primary">
            <Box w="100%" h="100%">
              <Grid templateRows="10vh 70vh 20vh">
                <GridItem
                  gridColumn="1 / -1"
                  gridRow="2"
                  zIndex={2}
                  justifySelf="center"
                  alignSelf="center"
                >
                  <Flex wrap="wrap" maxW="600px" gap={6}>
                    {renderPlayers().map((player: IPlayerData) => (
                      <div key={player.id}>
                        <CharacterCard
                          size="xs"
                          characterId={player.character}
                        />
                      </div>
                    ))}
                  </Flex>
                </GridItem>
                <GridItem
                  gridRow="2"
                  gridColumn="1 / -1"
                  alignSelf="center"
                  justifySelf="center"
                >
                  <Flex bg="tomato" borderRadius="full" w="20%" h="400px">
                    <div></div>
                  </Flex>
                </GridItem>
                <GridItem alignSelf="start" gridRow="3" justifySelf="center">
                  <Flex gap={2}>
                    {[1, 2, 5, 8, 9, 10, 11].map((number) => (
                      <div key={number}>
                        <CardPoints selected={false} point={number} />
                      </div>
                    ))}
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
          <GridItem gridRow="1" gridColumn={3}>
            <ChatMessages />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
