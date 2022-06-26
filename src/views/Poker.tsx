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
import {
  Grid,
  GridItem,
  Box,
  Container,
  SimpleGrid,
  Flex,
  Text,
} from "@chakra-ui/react";
import { DinoPoker } from "../components/atoms/dinopoker";
import { Nav } from "../components/molecules/nav/nav";
import { CardPoints } from "../components/atoms/card-points/card-points";
import { IconButton } from "../components/atoms/icon-button/icon-button";
import { Power, Settings, Share, Tool } from "react-feather";
import { ChatMessage } from "../components/atoms/chat-message/chat-message";

interface IPlayerState {
  player: IPlayerData;
}

export const Poker = () => {
  const { id } = useParams();
  const location = useLocation();

  const state = location.state as IPlayerState;

  const [loading, setLoading] = useState(false);

  const [currentPlayers, setCurrentPlayers] = useState<any>({});

  const checkIfRoomExists = async () => {
    setLoading(true);

    try {
      const { players } = await RoomsService.checkIfRoomExists(id);

      if (players) {
        setCurrentPlayers({ ...players });
      }
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPlayers = () => {
    const players = Object.keys(currentPlayers).map((key) => {
      return { ...currentPlayers[key] };
    });

    return players;
  };

  const db = getDatabase(app);

  const getCurrentPlayer = JSON.parse(localStorage.getItem("character") || "");

  useEffect(() => {
    if (getCurrentPlayer.player) {
      const updatePlayer = async () =>
        await RoomsService.updatePlayersFromRoom(getCurrentPlayer.player);

      updatePlayer();
    }

    checkIfRoomExists();

    return () => {};
  }, []);

  useEffect(() => {
    const roomDbRef = child(ref(db), "dinopoker-room/" + id + "/players");

    const unsubRoomDbRef = onValue(roomDbRef, (data) => {
      setCurrentPlayers({ ...data.val() });
    });

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
  }, []);

  return (
    <>
      <Box as="section">
        <Grid
          height="100vh"
          templateColumns="5% 75% 20%"
          justifyContent="center"
        >
          <GridItem
            gridRow="1"
            gridColumn={1}
            w="100%"
            h="100%"
            bg="dino.base4"
          >
            <Flex gap={3} direction="column" p={3} justifyContent="center">
              <IconButton
                bg="dino.secondary"
                ariaLabel="Share"
                icon={<Share />}
              />
              <IconButton
                bg="dino.secondary"
                ariaLabel="Room Settings"
                icon={<Tool />}
              />
              <IconButton
                bg="dino.secondary"
                ariaLabel="Room off"
                icon={<Power />}
              />
            </Flex>
          </GridItem>
          <GridItem gridColumn="2">
            <Box w="100%" h="100%">
              <Grid templateRows="10vh 70vh 20vh">
                <GridItem gridRow="1" alignSelf="start">
                  <DinoPoker />
                </GridItem>
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
                  <Flex
                    borderColor="dino.primary"
                    borderWidth="4px"
                    borderRadius="full"
                    bg="dino.secondary"
                    w="650px"
                    h="300px"
                  >
                    <div><p></p></div>
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
          <GridItem
            gridRow="1"
            gridColumn={3}
            w="100%"
            h="100%"
            bg="dino.base4"
          >
            <Flex gap={3} direction="column" p={3} justifyContent="center">
              <Text align="center">Chat messages</Text>
              <ChatMessage character={0} />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
