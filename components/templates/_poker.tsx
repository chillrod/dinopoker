import { Box, Center, GridItem, Spinner, Stack } from "@chakra-ui/react";
import { DataSnapshot, getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { appFirebase } from "../../config/firebase/firebase";
import { VoteSystemOptions } from "../../config/vote-system/vote-system";
import { IPlayerData } from "../../model/PlayerData";
import { IRoomData } from "../../model/RoomData";
import { getLocalStorage } from "../../services/local-storage/handler";
import { RoomsService } from "../../services/rooms/rooms.service";
import { CardPoints } from "../atoms/card-points/card-points";
import { PokerRoundData } from "../molecules/poker-round-data/poker-round-data";
import { PlainTemplate } from "./_plain-template";

const db = getDatabase(appFirebase)
const room = ({ id }: { id?: string | string[] }) => ref(db, `dinopoker-room/${id}`)
const players = ({ id }: { id?: string | string[] }) => ref(db, `dinopoker-room/${id}/players`)

export const Poker = () => {
  const router = useRouter();

  const [ROOM_DATA, SET_ROOM_DATA] = useState<IRoomData>();
  const [ROOM_PLAYERS, SET_ROOM_PLAYERS] = useState<{ [key: string]: string }>({});
  const [CURRENT_PLAYER, SET_CURRENT_PLAYER] = useState<IPlayerData>();

  const { id } = router.query;


  const handleCurrentPlayers = (currentPlayers: DataSnapshot | any) => {
    if (!currentPlayers) return;

    const players = Object.keys(currentPlayers).map(player => {
      const current = currentPlayers[player]

      if (current !== 'spectator') return { ...current, id: player };
    })

    return players
  }

  const handleDisabled = (players?: IPlayerData[]): boolean => {
    if (!players) return true;


    return Object.keys(players).length <= 0
  }

  const roomDataListener = (snapshot: DataSnapshot) => {
    SET_ROOM_DATA(snapshot.val())
  }

  useEffect(() => {
    const subscribeRoom = onValue(room({ id }), (data) => {
      roomDataListener(data)
    })

    const subscribePlayers = onValue(players({ id }), (data) => {
      SET_ROOM_PLAYERS(data.val())

      if (!getLocalStorage('user-client-key')) return;

      const currentPlayer = data.child(getLocalStorage('user-client-key'))

      SET_CURRENT_PLAYER({ ...currentPlayer.val(), id: currentPlayer.key })
    })

    return () => {
      subscribeRoom()
      subscribePlayers()
    }
  }, [])

  return (
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
      rows={["auto auto 1fr", "auto auto 1fr", "auto auto 1fr"]}
    >
      <GridItem
        area="poker"
        h="100%"
        justifyContent="center"
        alignSelf="center"
      >
        {ROOM_PLAYERS ? (<>
          <PokerRoundData
            currentPlayers={handleCurrentPlayers(ROOM_PLAYERS)}
            roomStatus={ROOM_DATA?.status}
            updateRoomStatus={() => { }}
          />
        </>) : <>
          <Center>
            <Spinner />
          </Center>
        </>}
      </GridItem>
      <GridItem
        area="vote"
        alignSelf="center"
        justifySelf="center"
      >
        <Stack direction="row" overflowX="auto" maxW="100vw"
          w={["80vw", "80vw", "100%", "100%"]}
          margin="0 auto"
        >
          {VoteSystemOptions[ROOM_DATA ? ROOM_DATA.voteSystem : 0]?.voteSystem.map(
            (number: number) => (
              <Box
                key={number}
              >
                <CardPoints
                  disabled={handleDisabled(ROOM_DATA?.players)}
                  onClick={(vote) => RoomsService.UPDATE_PLAYER({
                    roomId: id,
                    player: CURRENT_PLAYER?.id,
                    value: CURRENT_PLAYER?.vote === vote ? 0 : vote,
                    key: 'vote'
                  })}
                  selected={CURRENT_PLAYER?.vote === number}
                  point={number}
                />
              </Box>
            )
          )}
        </Stack>
      </GridItem>
    </PlainTemplate>
  );
};
