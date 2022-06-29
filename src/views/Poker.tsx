import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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

import { Grid, GridItem, Box, Flex, Text, Img, Tag } from "@chakra-ui/react";

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

const getCurrentPlayer = JSON.parse(localStorage.getItem("character") || "{}");

export const Poker = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as IPlayerState;

  const getCurrentPlayer = JSON.parse(
    localStorage.getItem("character") || "{}"
  );

  const [currentPlayers, setCurrentPlayers] = useState<any>({});
  const [currentPlayerPositions, setCurrentPlayerPositions] = useState<any>({});
  const [roomLoading, setRoomLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [roomStatus, setCurrentRoomStatus] = useState("");
  const [totalMd, setTotalMd] = useState();

  const parseSecretVoteBasedOnRoomStatus = (status: string, vote: number) => {
    const states: { [status: string]: string | number } = {
      PENDING: "-",
      REVEALED: vote,
    };

    return states[status];
  };

  const retrievePlayerFromRouting = async () => {
    const player = {
      ...getCurrentPlayer.player,
    };

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
    const player = currentPlayers[state?.player?.id];

    return player;
  };

  const handlePlayerVote = async (vote: number) => {
    const player = {
      ...getCurrentPlayer.player,
      vote: vote,
    };

    try {
      setRoomLoading(true);

      await RoomsService.updatePlayersFromRoom(player);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setRoomLoading(false);
    }
  };

  useMemo(() => {
    const players = Object.keys(currentPlayers).map((player) => {
      return {
        ...currentPlayers[player],
      };
    });

    setCurrentPlayerPositions({
      ["top"]: [...players.slice(1, 3), ...players.slice(5, 7)],
      ["bottom"]: [
        ...players.slice(0, 1),
        ...players.slice(7, 10),
        ...players.slice(14),
      ],
      ["left"]: [...players.slice(3, 5), ...players.slice(10, 11)],
      ["right"]: players.slice(11, 14),
    });
  }, [currentPlayers, roomStatus]);

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

  const resetPlayerVote = async (getCurrentPlayer: IPlayerData) => {
    try {
      setVoteLoading(true);

      await RoomsService.resetPlayerVote({
        ...getCurrentPlayer,
        vote: 0,
      });
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setVoteLoading(false);
    }
  };

  const calculateMd = (state: string) => {
    const states: { [status: string]: () => any } = {
      frontend: () => {
        const frontEndMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 1)
          .map((player) => currentPlayers[player].vote);

        return frontEndMd.reduce((acc, prev) => acc + prev, 0);
      },
      backend: () => {
        const backendMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 2)
          .map((player) => currentPlayers[player].vote);

        return backendMd.reduce((acc, prev) => acc + prev, 0);
      },
    };

    return states[state]();
  };

  // const test = (e: number, b: number) => {
  //   if (e > 0 && b > 0) {
  //     return e + b / 2;
  //   }

  //   return e + b;
  // };

  const db = getDatabase(app);

  const roomPlayersDbRef = child(ref(db), "dinopoker-room/" + id + "/players");
  const roomPlayerDbRef = child(
    ref(db),
    "dinopoker-room/" + id + "/players/" + state?.player?.id
  );

  const roomStatusDbRef = child(
    ref(db),
    "dinopoker-room/" + id + "/roomStatus"
  );

  useEffect(() => {
    const unsubRoomDbRef = onValue(roomPlayersDbRef, (data) => {
      setCurrentPlayers({ ...data.val() });
    });

    const unsubRoomPlayerDbRef = onValue(roomPlayerDbRef, (data) => {
      localStorage.setItem(
        "character",
        JSON.stringify({
          player: { ...data.val(), team: data.val().team },
          room: id,
        })
      );
    });

    const unsubRoomStatus = onValue(roomStatusDbRef, (data) => {
      setCurrentRoomStatus(data.val());

      const player = {
        ...getCurrentPlayer.player,
      };

      localStorage.setItem(
        "character",
        JSON.stringify({ player, room: player.room })
      );

      if (data.val() === "PENDING") {
        resetPlayerVote(getCurrentPlayer.player);
      }
    });

    retrievePlayerFromRouting();
    return () => {
      unsubRoomDbRef();
      unsubRoomStatus();
      unsubRoomPlayerDbRef();
    };
  }, []);

  const onDisconnectDbRef = child(
    ref(db),
    "dinopoker-room/" + id + "/players/" + state?.player?.id
  );

  useEffect(() => {
    onDisconnect(onDisconnectDbRef).remove();

    return () => {};
  }, []);

  useEffect(() => {
    if (!getCurrentPlayer.player) {
      navigate("/");
    }

    return () => {};
  }, []);

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
          <GridItem gridRow="1" gridColumn="1" w="100%" h="100%">
            <PokerMenu />
          </GridItem>
          <GridItem gridColumn="2" bg="rgba(0,0,0,0.3)">
            <Box w="100%" h="100%">
              <Grid templateRows="10vh 70vh 20vh">
                <DinoPoker />
                <GridItem
                  justifySelf="center"
                  gridRow="2"
                  gridColumn="1"
                ></GridItem>
                <GridItem gridColumn="1 / -1" alignSelf="center" gridRow="2">
                  <Grid
                    minH="30em"
                    justifyContent="center"
                    alignItems="center"
                    gridTemplateColumns="8em 50% 8em"
                    gridTemplateRows="auto auto auto"
                    gridTemplateAreas={`
                       "left top right"
                       "left table right"
                       "left bottom right"
                       `}
                  >
                    <GridItem
                      justifySelf="center"
                      w="100%"
                      bg="gray.700"
                      height="100%"
                      borderRadius="full"
                      area="table"
                      minH="150px"
                    >
                      <Flex
                        h="100%"
                        gap={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          loading={voteLoading}
                          onClick={() => updateRoomStatus(roomStatus)}
                        >
                          {parseActionsAndTextBasedOnStatus(roomStatus) ||
                            "Loading..."}
                        </Button>
                        {roomStatus === "REVEALED" && (
                          <Flex mt={2}>
                            <Tag color="yellow.400" fontSize="lg" mx={2}>
                              Total Frontend: {calculateMd("frontend")}
                            </Tag>
                            <Tag color="red.400" fontSize="lg" mx={2}>
                              Total Backend: {calculateMd("backend")}
                            </Tag>
                            {/* <Text fontSize="lg">
                              Média Total:{" "}
                              {test(
                                calculateMd("frontend"),
                                calculateMd("backend")
                              )}
                            </Text> */}
                          </Flex>
                        )}
                      </Flex>
                    </GridItem>
                    {Object.keys(currentPlayerPositions).map(
                      (playerPosition) => (
                        <GridItem
                          justifySelf="center"
                          key={playerPosition}
                          area={playerPosition}
                        >
                          <Flex
                            gap={4}
                            direction={
                              playerPosition === "left" ||
                              playerPosition === "right"
                                ? "column"
                                : "row"
                            }
                          >
                            {currentPlayerPositions[playerPosition].map(
                              (player: IPlayerData) => (
                                <div key={player.id}>
                                  <PokerCharacter
                                    character={player}
                                    status={roomStatus}
                                    handleVoteFunction={
                                      parseSecretVoteBasedOnRoomStatus
                                    }
                                  />
                                </div>
                              )
                            )}
                          </Flex>
                        </GridItem>
                      )
                    )}
                  </Grid>
                </GridItem>
                <GridItem alignSelf="start" gridRow="3" justifySelf="center">
                  <Flex gap={2}>
                    {VoteSystemOptions["modified-fibonacci"]?.voteSystem.map(
                      (number) => (
                        <div key={number}>
                          <CardPoints
                            disabled={roomStatus !== "PENDING"}
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
