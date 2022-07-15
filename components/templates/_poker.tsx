import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { child, getDatabase, onDisconnect, onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { appFirebase } from "../../config/firebase/firebase";
import { VoteSystemOptions } from "../../config/vote-system/vote-system";
import { IPlayerData } from "../../model/PlayerData";
import { getLocalStorage } from "../../services/local-storage/handler";
import { NotificationsService } from "../../services/notifications/notifications.service";
import { RoomsService } from "../../services/rooms/rooms.service";
import { CardPoints } from "../atoms/card-points/card-points";
import { PokerRoundData } from "../molecules/poker-round-data/poker-round-data";

const Poker = () => {
  const router = useRouter();
  const { id } = router.query;

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
    const playerId = getLocalStorage("character")?.player?.id;

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

  const db = getDatabase(appFirebase);
  const playerListValues = child(ref(db), `dinopoker-room/${id}/players`);
  const statusValues = child(ref(db), `dinopoker-room/${id}/roomStatus`);

  useEffect(() => {
    const subscribedPlayers = onValue(playerListValues, (data) => {
      handleAddPlayerNode(data.val());
    });

    const subscribedRoomStatus = onValue(statusValues, (data) => {
      setCurrentRoomStatus(data.val());

      if (roomStatus === "REVEALED" && data.val() === "PENDING") {
        resetPlayerVote(getLocalStorage("character").player);
      }
    });

    return () => {
      subscribedPlayers();
      subscribedRoomStatus();
    };
  }, [playerListValues]);

  useEffect(() => {
    const player = getLocalStorage("character")?.player || "";

    if (!player) return;

    const db = getDatabase(appFirebase);

    const currentPlayerNode = child(
      ref(db),
      `dinopoker-room/${id}/players/${player.id}`
    );

    onDisconnect(currentPlayerNode).remove();

    return () => {};
  }, []);

  useEffect(() => {
    const player = getLocalStorage("character")?.player || "";

    if (!player) return;

    setCharacterToRoom(player);
  }, []);

  useEffect(() => {
    if (!getLocalStorage("character")?.player) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Grid
        height="calc(100vh - 100px)"
        alignItems="center"
        gridTemplateAreas={`
        "poker"
        "vote"
        `}
        gridTemplateColumns="1fr"
        gridTemplateRows="auto auto"
        p={4}
      >
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
          <Flex maxW="100vw" overflow="auto">
            {VoteSystemOptions["modified-fibonacci"]?.voteSystem.map(
              (number: number) => (
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

export default Poker;
