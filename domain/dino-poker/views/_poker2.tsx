import { Box, Flex, GridItem } from "@chakra-ui/react";
import {
  child,
  getDatabase,
  onChildChanged,
  onDisconnect,
  onValue,
  ref,
} from "firebase/database";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { appFirebase } from "../../../config/firebase/firebase";
import { VoteSystemOptions } from "../interface/vote-system/vote-system";
import { IPlayerData } from "../interface/PlayerData";
import { getLocalStorage } from "../../../providers/local-storage/handler";
import { NotificationsService } from "../../../providers/notifications/notifications.service";
import { RoomsService } from "../services/rooms/rooms.service";
import { CardPoints } from "../components/card-points/card-points";
import { PokerRoundData } from "../components/poker-round-data/poker-round-data";
import JoinRoomDialog from "../components/_join-room-dialog";
import { PlainTemplate } from "../../../components/templates/_plain-template";

export const Poker = () => {
  const router = useRouter();
  const localStoragePlayer = getLocalStorage("character")?.player;

  const { id } = router.query;

  const [currentPlayers, setCurrentPlayers] = useState<IPlayerData[]>([]);
  const [characterExists, setCharacterExists] = useState(false);

  const emitJoinRoomDialog = useCallback(async () => {
    if (characterExists) return;

    NotificationsService.emitMessageBox({
      message: "",
      func: "SET_JOIN_ROOM",
      children: <JoinRoomDialog room={id?.toString()} />,
      onClose: () => router.push("/"),
    });
  }, [characterExists]);

  const pickCurrentPlayer = useCallback(() => {
    return currentPlayers.find((player) => player.id === localStoragePlayer.id);
  }, [localStoragePlayer]);

  const emitPlayerVote = async (vote: number) => {
    const player = pickCurrentPlayer();


    if (!player) return;

    try {
      await RoomsService.CHANGE_PLAYER_VOTE({
        ...player,
        vote,
      });
    } catch (err) {

    } finally {
    }
  };

  const db = getDatabase(appFirebase);
  const playerListValues = child(ref(db), `dinopoker-room/${id}/players`);

  useEffect(() => {
    const currentPlayer = getLocalStorage("character")?.player || "";

    const unsubPlayers = onValue(playerListValues, (data) => {
      const players = data.val();

      const hasKey = !data.exists()
        ? false
        : Object.keys(players).some((key) => key === currentPlayer.id);

      if (!data.exists() || !currentPlayer || !hasKey) {
        setCharacterExists(!!data.exists());

        emitJoinRoomDialog();

        return;
      }

      const playerList = Object.keys(players).map((key) => {
        return {
          ...players[key],
          id: key,
        };
      });

      setCurrentPlayers((prevPlayers) => {
        if (prevPlayers.length !== playerList.length) {
          return playerList;
        }

        return prevPlayers;
      });
    });

    const unsubPlayerDetails = onChildChanged(playerListValues, (data) => {
      const player = data.val();

      if (!player) return;

      const findIndex = currentPlayers.findIndex(
        (player) => player.id === data.key
      );

      currentPlayers[findIndex] = {
        ...player,
      };

      // setCurrentPlayers((prevPlayers) => {
      //   return prevPlayers.map((players) => {
      //     if (players.id === data.key) return player;

      //     return players;
      //   });
      // });

      // setCurrentPlayers({
      //   ...currentPlayers,
      //   [data.key]: {
      //     ...player,
      //   },
      // });
    });

    return () => {
      unsubPlayers();
      unsubPlayerDetails();
    };
  }, [playerListValues]);

  useEffect(() => {
    const player = getLocalStorage("character")?.player;

    if (!player) return;

    const currentPlayerNode = child(
      ref(db),
      `dinopoker-room/${player.room}/players/${player.id}`
    );

    onDisconnect(currentPlayerNode).remove();

    return () => {
      onDisconnect(currentPlayerNode).cancel();
    };
  });

  const PlainTemplateAreas = [
    `
    "poker poker poker"
    "poker poker poker"
    "vote vote vote"
    `,
    `
    "poker poker poker"
    "poker poker poker"
    "vote vote vote"
    `,
    `
    "poker poker poker"
    "poker poker poker"
    "vote vote vote"
    `,
    `
    "poker poker poker"
    "poker poker poker"
    "vote vote vote"
    `,
  ];

  return (
    <PlainTemplate
      areas={PlainTemplateAreas}
      cols={["repeat(1fr, 3)"]}
      rows={["auto auto 1fr", "auto auto 1fr", "auto auto 1fr"]}
    >
      <GridItem
        area="poker"
        h="100%"
        justifyContent="center"
        alignSelf="center"
      >
        <PokerRoundData
          currentPlayers={currentPlayers}
          voteLoading={false}
          roomStatus="REVEALED"
          updateRoomStatus={() => { }}
        />
      </GridItem>
      <GridItem
        area="vote"
        justifySelf="center"
        alignSelf={["center", "center", "center"]}
        p={2}
      >
        <Flex maxW="80vw" overflow="auto" margin="0 auto">
          {VoteSystemOptions["modified-fibonacci"]?.voteSystem.map(
            (number: number) => (
              <Box key={number} mx={1}>
                <CardPoints
                  onClick={(vote) => emitPlayerVote(vote)}
                  selected={number === pickCurrentPlayer()?.vote}
                  point={number}
                />
              </Box>
            )
          )}
        </Flex>
      </GridItem>
    </PlainTemplate>
  );
};
