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

import {
  Grid,
  GridItem,
  Box,
  Flex,
  Text,
  Spinner,
  Img,
} from "@chakra-ui/react";

import { CardPoints } from "../components/atoms/card-points/card-points";
import { PokerMenu } from "../components/molecules/poker-menu/poker-menu";
import { PokerCharacter } from "../components/atoms/poker-character/poker-character";
import { DinoPoker } from "../components/atoms/dinopoker";
import { VoteSystemOptions } from "../config/vote-system/vote-system";
import { Button } from "../components/atoms/button/button";
import { CharacterList } from "../config/characters";
import { AnimatePresence, motion } from "framer-motion";

interface IPlayerState {
  player: IPlayerData;
}

export const Poker = () => {
  const { id } = useParams();
  const location = useLocation();

  const state = location.state as IPlayerState;
  const getCurrentPlayer = JSON.parse(localStorage.getItem("character") || "");

  const [currentPlayers, setCurrentPlayers] = useState<any>({});
  const [roomLoading, setRoomLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [roomStatus, setCurrentRoomStatus] = useState("");

  const parseSecretVoteBasedOnRoomStatus = (status: string, vote: number) => {
    const states: { [status: string]: string | number } = {
      PENDING: "-",
      REVEALED: vote,
    };

    return states[status];
  };

  const retrievePlayerFromRouting = async () => {
    try {
      setRoomLoading(true);

      await RoomsService.updatePlayersFromRoom(getCurrentPlayer.player);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setRoomLoading(false);
    }
  };

  const pickCurrentPlayer = () => {
    const player = currentPlayers[state.player.id];

    return player;
  };

  const handlePlayerVote = async (vote: number) => {
    const player = {
      ...getCurrentPlayer.player,
      vote: vote,
    };

    localStorage.setItem(
      "character",
      JSON.stringify({ player, room: player.room })
    );

    try {
      setRoomLoading(true);

      await RoomsService.updatePlayersFromRoom(player);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setRoomLoading(false);
    }
  };

  const renderPlayers = () => {
    const players = Object.keys(currentPlayers).map((key) => {
      return { ...currentPlayers[key] };
    });

    return players;
  };

  const parseActionsAndTextBasedOnStatus = (roomStatus: string) => {
    const states: { [status: string]: string } = {
      PENDING: "Reveal votes",
      REVEALED: "Restart",
    };

    return states[roomStatus];
  };

  const updateRoomStatus = async (roomStatus: string) => {
    const states: { [status: string]: string } = {
      PENDING: "REVEALED",
      REVEALED: "PENDING",
    };

    try {
      setVoteLoading(true);
      await RoomsService.updateRoomStatus(id, states[roomStatus]);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setVoteLoading(false);
    }
  };

  const db = getDatabase(app);

  useEffect(() => {
    const roomPlayersDbRef = child(
      ref(db),
      "dinopoker-room/" + id + "/players"
    );
    const roomStatus = child(ref(db), "dinopoker-room/" + id + "/roomStatus");

    const unsubRoomDbRef = onValue(roomPlayersDbRef, (data) => {
      setCurrentPlayers({ ...data.val() });
    });

    const unsubRoomStatus = onValue(roomStatus, (data) => {
      setCurrentRoomStatus(data.val());
    });

    retrievePlayerFromRouting();

    return () => {
      unsubRoomDbRef();
      unsubRoomStatus();
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

  const shadows = {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  };

  return (
    <>
      <AnimatePresence presenceAffectsLayout={true}>
        {roomLoading && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
          >
            <Flex
              justifyContent="center"
              direction="column"
              gap={2}
              sx={{
                position: "absolute",
                right: 10,
                bottom: 50,
              }}
            >
              <Img w="50%" src={CharacterList[0].src} />
              <Text>Loading...</Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
      <Box as="section">
        <Grid
          templateColumns="auto 3fr auto"
          height="100vh"
          justifyContent="center"
        >
          <GridItem
            bg="purple.800"
            gridRow="1"
            gridColumn="1"
            w="100%"
            h="100%"
          >
            <PokerMenu />
          </GridItem>
          <GridItem gridColumn="2">
            <Box w="100%" h="100%">
              <Grid templateRows="10vh 70vh 20vh">
                <DinoPoker />
                <GridItem justifySelf="center" gridRow="2" gridColumn="1">
                  <Button
                    loading={voteLoading}
                    onClick={() => updateRoomStatus(roomStatus)}
                  >
                    {parseActionsAndTextBasedOnStatus(roomStatus)}
                  </Button>
                </GridItem>
                <GridItem
                  gridColumn="1 / -1"
                  alignSelf="center"
                  gridRow="2"
                  zIndex={2}
                >
                  <Flex
                    wrap="wrap"
                    justifyContent="center"
                    gap={8}
                    maxW="60%"
                    margin="0 auto"
                  >
                    {[...renderPlayers()].map((player: IPlayerData) => (
                      <Flex direction="column" alignItems="center">
                        <PokerCharacter
                          character={player}
                          status={roomStatus}
                          handleVoteFunction={parseSecretVoteBasedOnRoomStatus}
                        />
                      </Flex>
                    ))}
                  </Flex>
                </GridItem>
                <GridItem gridRow="2" gridColumn="1 / -1" alignSelf="center">
                  <Flex
                    {...shadows}
                    margin="0 auto"
                    bg="purple.800"
                    borderRadius="full"
                    w="80%"
                    h="50vh"
                  ></Flex>
                </GridItem>
                <GridItem alignSelf="start" gridRow="3" justifySelf="center">
                  <Flex gap={2}>
                    {VoteSystemOptions["modified-fibonacci"]?.voteSystem.map(
                      (number) => (
                        <div key={number}>
                          <CardPoints
                            onClick={(vote) => handlePlayerVote(vote)}
                            selected={number === pickCurrentPlayer()?.vote}
                            point={number}
                          />
                        </div>
                      )
                    )}
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
          {/* <GridItem gridRow="1" gridColumn={3} bg="dino.base5">
            <ChatMessages />
          </GridItem> */}
        </Grid>
      </Box>
    </>
  );
};
