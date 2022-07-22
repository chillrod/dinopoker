import { Box, Flex, GridItem } from "@chakra-ui/react";
import { get, getDatabase, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { appFirebase } from "../../config/firebase/firebase";
import { VoteSystemOptions } from "../../config/vote-system/vote-system";
import { emitter } from "../../services/emitter/emitter";
import { getLocalStorage } from "../../services/local-storage/handler";
import { NotificationsService } from "../../services/notifications/notifications.service";
import { RoomsService } from "../../services/rooms/rooms.service";
import { CardPoints } from "../atoms/card-points/card-points";
import { PokerRoundData } from "../molecules/poker-round-data/poker-round-data";
import JoinRoomDialog from "./_join-room-dialog";
import { PlainTemplate } from "./_plain-template";

export const Poker = () => {
  const router = useRouter();

  const { id } = router.query;


  const checkPlayer = async () => {
    const db = getDatabase(appFirebase);

    const room = await get(ref(db, "dinopoker-room/" + id))

    const players = await get(ref(db, "dinopoker-room/" + id + "/players")).then(res => res);

    const hasChild = players.hasChild(getLocalStorage('user-client-key') || 'random')

    return {
      hasRoom: room.exists(),
      hasPlayer: hasChild
    }
  }

  useEffect(() => {
    RoomsService.CHECK_STATE({ roomId: id })
  }, []);

  useEffect(() => {
    emitter.on('EMIT_INVALID_ROOM_STATE', async ({ hasPlayer, hasRoom }) => {
      if (!hasRoom) {
        NotificationsService.emitScreenLoading({
          show: true,
          message: 'Invalid room, redirecting...'
        })

        await router.push("/");

        NotificationsService.emitScreenLoading({
          show: false,
        })
      }

      if (!hasPlayer) {
        NotificationsService.emitMessageBox({
          children: <JoinRoomDialog room={id?.toString()} />,
          message: "",
          func: "SET_JOIN_ROOM",
          onClose: () => router.push("/"),
        });
      }
    })

    return () => {
      emitter.off('EMIT_INVALID_ROOM_STATE')
    }
  }, [])


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
      <GridItem
        area="poker"
        h="100%"
        justifyContent="center"
        alignSelf="center"
      >
        <PokerRoundData
          currentPlayers={
            [
              {
                name: "rod Rod",
                team: 1,
                raiseHand: false,
                vote: 2,
              },
            ]
          }
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
        <Flex maxW="100vw" overflow="auto">
          {VoteSystemOptions["modified-fibonacci"]?.voteSystem.map(
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
    </PlainTemplate>
  );
};
