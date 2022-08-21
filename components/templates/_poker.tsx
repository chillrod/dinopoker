import { Box, Center, GridItem, Spinner, Stack } from "@chakra-ui/react";
import { DataSnapshot, getDatabase, onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { appFirebase } from "../../config/firebase/firebase";
import { VoteSystemOptions } from "../../config/vote-system/vote-system";
import { IRoomData } from "../../model/RoomData";
import { CardPoints } from "../atoms/card-points/card-points";
import { PokerRoundData } from "../molecules/poker-round-data/poker-round-data";
import { PlainTemplate } from "./_plain-template";

export const Poker = () => {
  const router = useRouter();

  const [ROOM_DATA, SET_ROOM_DATA] = useState<IRoomData>()

  const { id } = router.query;

  const db = getDatabase(appFirebase)

  const handleCurrentPlayers = (currentPlayers: any) => {
    if (!currentPlayers) return;


    const players = Object.keys(currentPlayers).map(player => {
      const current = currentPlayers[player]

      if (current !== 'spectator') return current;

    })

    return players
  }

  const roomDataListener = (snapshot: DataSnapshot) => {
    SET_ROOM_DATA(snapshot.val())
  }

  const room = ref(db, `dinopoker-room/${id}`)

  useEffect(() => {

    const roomSubscribe = onValue(room, (data) => {
      roomDataListener(data)
    })


    return () => {
      roomSubscribe()
    }

  }, [room])

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
        {ROOM_DATA ? (<>
          <PokerRoundData
            currentPlayers={handleCurrentPlayers(ROOM_DATA?.players)}
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
                  onClick={(vote) => console.log(vote)}
                  selected={number === 2}
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
