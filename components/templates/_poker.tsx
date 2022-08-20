import { Box, Flex, GridItem } from "@chakra-ui/react";
import { DataSnapshot, getDatabase, onChildChanged, onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { appFirebase } from "../../config/firebase/firebase";
import { VoteSystemOptions } from "../../config/vote-system/vote-system";
import { IPlayerData } from "../../model/PlayerData";
import { IRoomData } from "../../model/RoomData";
import { CardPoints } from "../atoms/card-points/card-points";
import { PokerRoundData } from "../molecules/poker-round-data/poker-round-data";
import { PlainTemplate } from "./_plain-template";

export const Poker = () => {
  const router = useRouter();

  const [roomValues, setRoomValues] = useState<IRoomData>()

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

  const handleRoomValues = (snapshot: DataSnapshot) => {
    setRoomValues(snapshot.val())

  }

  const room = ref(db, `dinopoker-room/${id}`)

  useEffect(() => {

    const roomSubscribe = onValue(room, (data) => {
      handleRoomValues(data)
    })


    return () => {
      roomSubscribe()
    }

  }, [room])

  return (
    <PlainTemplate
      areas={[
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
      ]}
      cols={["1fr 1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]}
      rows={["auto auto 1fr", "auto auto 1fr", "auto auto 1fr"]}
    >
      {roomValues ? (
        <>
          <GridItem
            area="poker"
            h="100%"
            justifyContent="center"
            alignSelf="center"
          >
            <PokerRoundData
              currentPlayers={handleCurrentPlayers(roomValues.players)}
              roomStatus={roomValues.status}
              updateRoomStatus={() => { }}
            />
          </GridItem>
          <GridItem
            area="vote"
            justifySelf="center"
            alignSelf={["center", "center", "center"]}
            p={2}
          >
            <Flex maxW="100vw" overflow="auto">
              {VoteSystemOptions[roomValues.voteSystem]?.voteSystem.map(
                (number: number) => (
                  <Box key={number} mx={1}>
                    <CardPoints
                      onClick={(vote) => console.log(vote)}
                      selected={number === 2}
                      point={number}
                    />
                  </Box>
                )
              )}
            </Flex>
          </GridItem>
        </>
      ) : <></>}

    </PlainTemplate>
  );
};
