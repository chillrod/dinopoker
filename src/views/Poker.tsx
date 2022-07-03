import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { RoomsService } from "../services/rooms/rooms.service";
import { NotificationsService } from "../services/notifications/notifications.service";

import {
  child,
  getDatabase,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
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
import { getLocalStorage } from "../services/local-storage/handler";

export const Poker = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPlayers, setCurrentPlayers] = useState<any>({});
  const [roomLoading, setRoomLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [roomStatus, setCurrentRoomStatus] = useState("");

  const handleAddPlayerNode = (players: any) => {
    setCurrentPlayers({ ...players });
  };

  const pickCurrentPlayerVote = () => {
    const playerId = getLocalStorage("character").player?.id;

    const player = currentPlayers[playerId];

    if (player) {
      return player.vote;
    }

    return "";
  };

  const handlePlayerRemoved = (player: IPlayerData) => {
    if (player.id) {
      const newPlayers = { ...currentPlayers };

      newPlayers[player.id] = { ...player, removed: true };

      setCurrentPlayers(newPlayers);
    }
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

    const subscribedPlayerAdded = onValue(playerListValues, (data) => {
      handleAddPlayerNode(data.val());
    });

    const subscribedPlayerRemoved = onChildRemoved(playerListValues, (data) => {
      handlePlayerRemoved(data.val());
    });

    const subscribedRoomStatus = onValue(statusValues, (data) => {
      setCurrentRoomStatus(data.val());

      if (data.val() === "PENDING") {
        resetPlayerVote(getLocalStorage("character").player);
      }
    });

    return () => {
      subscribedPlayerAdded();
      subscribedPlayerRemoved();
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
              alignSelf="start"
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
                        selected={number === pickCurrentPlayerVote()}
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
  );
};
