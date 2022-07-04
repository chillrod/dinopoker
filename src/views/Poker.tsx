import { Suspense, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RoomsService } from "../services/rooms/rooms.service";
import { NotificationsService } from "../services/notifications/notifications.service";

import {
  child,
  getDatabase,
  onChildRemoved,
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
  Img,
  Text,
  Container,
} from "@chakra-ui/react";

import { CardPoints } from "../components/atoms/card-points/card-points";
import { PokerMenu } from "../components/molecules/poker-menu/poker-menu";
import { DinoPoker } from "../components/atoms/dinopoker";
import { VoteSystemOptions } from "../config/vote-system/vote-system";
import { PokerRoundData } from "../components/molecules/poker-round-data/poker-round-data";
import { getLocalStorage } from "../services/local-storage/handler";
import { AnimatePresence, motion } from "framer-motion";
import { CharacterList } from "../config/characters";

export const Poker = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPlayers, setCurrentPlayers] = useState<any>({});
  const [test, setTest] = useState({});
  const [roomLoading, setRoomLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [roomStatus, setCurrentRoomStatus] = useState("");

  const handleAddPlayerNode = (players: any) => {
    setCurrentPlayers({ ...players });
    setTest({ ...test, ...players });
  };

  const pickCurrentPlayerVote = () => {
    const playerId = getLocalStorage("character").player?.id;

    const player = currentPlayers[playerId];

    if (player) {
      return player.vote;
    }

    return "";
  };

  const setCharacterToRoom = async (player: IPlayerData) => {
    try {
      setRoomLoading(true);

      await RoomsService.setCharacterToRoom(player);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setRoomLoading(false);
    }
  };

  const handlePlayerVote = async (vote: number) => {
    const player = {
      ...getLocalStorage("character").player,
      vote: vote,
    };

    try {
      setRoomLoading(true);

      await RoomsService.changePlayerVote(player);
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

  useEffect(() => {
    const db = getDatabase(app);

    const playerListValues = child(ref(db), `dinopoker-room/${id}/players`);
    const statusValues = child(ref(db), `dinopoker-room/${id}/roomStatus`);

    const subscribedPlayers = onValue(playerListValues, (data) => {
      handleAddPlayerNode(data.val());
    });

    const subscribedRoomStatus = onValue(statusValues, (data) => {
      setCurrentRoomStatus(data.val());

      if (data.val() === "PENDING") {
        resetPlayerVote(getLocalStorage("character").player);
      }
    });

    return () => {
      subscribedPlayers();
      subscribedRoomStatus();
    };
  }, []);

  useEffect(() => {
    const db = getDatabase(app);

    const currentPlayerNode = child(
      ref(db),
      `dinopoker-room/${id}/players/${getLocalStorage("character").player.id}`
    );

    onDisconnect(currentPlayerNode).remove();

    return () => {};
  }, []);

  useEffect(() => {
    if (getLocalStorage("character").player) {
      setCharacterToRoom(getLocalStorage("character").player);
    }
  }, []);

  useEffect(() => {
    if (!getLocalStorage("character").player) {
      navigate("/");
    }

    return () => {};
  }, []);

  return (
    <>
      <Grid
        gridTemplateAreas={`
        "nav"
        "poker"
        "vote"
        `}
        h="100vh"
        gridTemplateColumns="1fr"
        gridTemplateRows="auto 1fr auto"
      >
        <GridItem area="nav" p={4} px={5}>
          <Flex w="100%" justifyContent="space-between">
            <DinoPoker />
            <PokerMenu />
          </Flex>
        </GridItem>
        <GridItem p={3} area="poker" borderRadius="lg">
          <Grid
            borderRadius="md"
            h="100%"
            gridTemplateAreas={`
                "game"
                "game"
                `}
          >
            <GridItem area="game" alignSelf="center">
              <PokerRoundData
                voteLoading={voteLoading}
                roomStatus={roomStatus}
                updateRoomStatus={updateRoomStatus}
                currentPlayers={currentPlayers}
              />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem area="vote" alignSelf="end" justifySelf="center">
          <Flex p={3} maxW="100vw" overflow="auto">
            {VoteSystemOptions["modified-fibonacci"]?.voteSystem.map(
              (number) => (
                <Box key={number} mx={1}>
                  <CardPoints
                    disabled={roomStatus !== "PENDING"}
                    onClick={(vote) => handlePlayerVote(vote)}
                    selected={number === pickCurrentPlayerVote()}
                    point={number}
                  />
                </Box>
              )
            )}
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};
