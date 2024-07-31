import { Box, Center, Grid, GridItem, Spinner, Stack } from "@chakra-ui/react";
import { DataSnapshot, getDatabase, onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { appFirebase } from "../../config/firebase/firebase";
import { VoteSystemOptions } from "../../config/vote-system/vote-system";
import { IPlayerData } from "../../model/PlayerData";
import { IRoomData, RoomDataStatus } from "../../model/RoomData";
import { emitter } from "../../services/emitter/emitter";
import { getLocalStorage } from "../../services/local-storage/handler";
import { PlayerService } from "../../services/player/player.service";
import { RoomsService } from "../../services/rooms/rooms.service";
import { CardPoints } from "../atoms/card-points/card-points";
import { PokerMenu } from "../molecules/poker-menu/poker-menu";
import { PokerRoundData } from "../molecules/poker-round-data/poker-round-data";
import { PlainTemplate } from "./_plain-template";

const db = getDatabase(appFirebase);
const status = ({ id }: { id?: string | string[] }) =>
  ref(db, `dinopoker-room/${id}/status`);
const voteSystem = ({ id }: { id?: string | string[] }) =>
  ref(db, `dinopoker-room/${id}/voteSystem`);
const players = ({ id }: { id?: string | string[] }) =>
  ref(db, `dinopoker-room/${id}/players`);

export const Poker = () => {
  const router = useRouter();
  const [ROOM_DATA, SET_ROOM_DATA] = useState<IRoomData>({} as IRoomData);
  const [CURRENT_PLAYER, SET_CURRENT_PLAYER] = useState<IPlayerData>();
  const [SPECTATOR, SET_SPECTATOR] = useState(false);

  const { id } = router.query;

  const handleCurrentPlayers = (currentPlayers: DataSnapshot | any) => {
    if (!currentPlayers) return;

    const players = Object.keys(currentPlayers).map((player) => {
      const current = currentPlayers[player];

      if (current !== "spectator") return { ...current, id: player };
    });

    return players;
  };

  const handleDisabled = (players?: IPlayerData[]): boolean => {
    if (!players) return true;

    if (ROOM_DATA.status === RoomDataStatus.REVEALED) return true;

    return Object.keys(players).length === 0;
  };

  useEffect(() => {
    const subscribeStatus = onValue(status({ id }), (data) => {
      if (data.val() === RoomDataStatus.PENDING) {
        RoomsService.UPDATE_PLAYER({
          roomId: id,
          key: "vote",
          value: null,
          player: getLocalStorage("user-client-key"),
        });
      }

      SET_ROOM_DATA((prevState) => ({ ...prevState, status: data.val() }));
    });

    const subscribeVoteSystem = onValue(voteSystem({ id }), (data) => {
      SET_ROOM_DATA((prevState) => ({ ...prevState, voteSystem: data.val() }));
    });

    const subscribePlayers = onValue(players({ id }), (data) => {
      SET_ROOM_DATA((prevState) => ({ ...prevState, players: data.val() }));

      if (!getLocalStorage("user-client-key")) return;

      const currentPlayer = data.child(getLocalStorage("user-client-key"));

      if (currentPlayer.val() === "spectator") {
        SET_CURRENT_PLAYER(currentPlayer.val());

        return PlayerService.SET_SPECTATOR(true);
      }

      SET_CURRENT_PLAYER({ ...currentPlayer.val(), id: currentPlayer.key });
    });

    return () => {
      subscribeStatus();
      subscribeVoteSystem();
      subscribePlayers();
    };
  }, []);

  useEffect(() => {
    emitter.on("SET_SPECTATOR", (data) => {
      SET_SPECTATOR(data);
    });

    return () => {
      emitter.off("SET_SPECTATOR");
    };
  }, []);

  return (
    <>
      <PlainTemplate
        areas={[
          `
            "poker"
            "poker"
            "vote"
            `,
          `
            "poker"
            "poker"
            "vote"
            `,
          `
            "poker"
            "poker"
            "vote"
            `,
          `
            "poker"
            "poker"
            "vote"
            `,
        ]}
        cols={["1fr", "1fr", "1fr", "1fr"]}
        rows={["auto auto 1fr", "auto auto 1fr ", "auto auto 1fr"]}
      >
        {ROOM_DATA.players ? (
          <>
            <GridItem area="poker" justifyContent="center" alignSelf="start">
              <PokerRoundData
                currentPlayers={handleCurrentPlayers(ROOM_DATA.players)}
                roomStatus={ROOM_DATA?.status}
              />
            </GridItem>
            <GridItem area="vote" alignSelf="center" justifySelf="center">
              <Stack
                overflow="auto"
                direction="row"
                maxW="100vw"
                w={["80vw", "80vw", "100%", "100%"]}
                margin="0 auto"
              >
                {VoteSystemOptions[ROOM_DATA.voteSystem]?.voteSystem.map(
                  (number: number) => (
                    <Box key={number}>
                      <CardPoints
                        disabled={
                          handleDisabled(ROOM_DATA.players) ||
                          CURRENT_PLAYER === "spectator"
                        }
                        onClick={(vote) =>
                          RoomsService.UPDATE_PLAYER({
                            roomId: id,
                            player: CURRENT_PLAYER?.id,
                            value: CURRENT_PLAYER?.vote === vote ? 0 : vote,
                            key: "vote",
                          })
                        }
                        selected={CURRENT_PLAYER?.vote === number}
                        point={number}
                      />
                    </Box>
                  )
                )}
              </Stack>
            </GridItem>
          </>
        ) : (
          <>
            <Center>
              <Spinner />
            </Center>
          </>
        )}
      </PlainTemplate>
    </>
  );
};
