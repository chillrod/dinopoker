import { useEffect, useState } from "react";
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

import { Grid, GridItem, Box, Flex, Text, Img } from "@chakra-ui/react";

import { CardPoints } from "../components/atoms/card-points/card-points";
import { PokerMenu } from "../components/molecules/poker-menu/poker-menu";
import { DinoPoker } from "../components/atoms/dinopoker";
import { VoteSystemOptions } from "../config/vote-system/vote-system";
import { PokerRoundData } from "../components/molecules/poker-round-data/poker-round-data";
import { AnimatePresence, motion } from "framer-motion";
import { CharacterList } from "../config/characters";
import { ChatMessages } from "../components/molecules/chat-messages/chat-messages";

interface IPlayerState {
  player: IPlayerData;
}

export const Poker = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as IPlayerState;

  const getCurrentPlayer = JSON.parse(
    localStorage.getItem("character") || "{}"
  );

  const [currentPlayers, setCurrentPlayers] = useState<any>({});
  const [roomLoading, setRoomLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [roomStatus, setCurrentRoomStatus] = useState("");

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

  const calculateMd = (state: string) => {
    const states: { [status: string]: () => any } = {
      frontend: () => {
        const frontEndMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 1)
          .map((player) => currentPlayers[player].vote);

        if (!frontEndMd.length) return "";

        return Math.max(...frontEndMd);
      },
      backend: () => {
        const backendMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 2)
          .map((player) => currentPlayers[player].vote);

        if (!backendMd.length) return "";

        return Math.max(...backendMd);
      },
    };

    return states[state]();
  };

  const calculateAverage = (team1Value: number, team2Value: number) => {
    if (team1Value > 0 && team2Value > 0) {
      return team1Value + team2Value / 2;
    }

    return team1Value + team2Value;
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
                left: 10,
                bottom: 50,
              }}
            >
              <Img w="50%" src={CharacterList[2].src} />
              <Text>Carregando...</Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
      <Box as="section">
        <Grid
          gridTemplateAreas={`
        "poker poker nav"
        "poker poker nav"
        "poker poker nav"
        `}
          h="100vh"
          gridTemplateColumns="2fr 2fr auto"
        >
          <GridItem gridArea={"nav"} bg="dino.secondary">
            <PokerMenu />
          </GridItem>
          <GridItem gridArea="poker" justifyContent="center">
            <Grid
              w="100%"
              h="100vh"
              gridTemplateAreas={`
                    "logo"
                    "game"
                    "vote"
                    `}
              gridTemplateColumns="1fr"
              gridTemplateRows="0.5fr auto 0.5fr"
              p={4}
            >
              <GridItem
                gridArea="logo"
                alignSelf="center"
                p={2}
                bg="dino.secondary"
              >
                <DinoPoker small />
              </GridItem>
              <GridItem gridArea="game" alignSelf="center">
                <PokerRoundData
                  voteLoading={voteLoading}
                  roomStatus={roomStatus}
                  updateRoomStatus={updateRoomStatus}
                  currentPlayers={currentPlayers}
                />
              </GridItem>
              <GridItem gridArea="vote" justifySelf="center" alignSelf="end">
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
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
