import { Flex, Img, Tag } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";

import { RoomDataStatus } from "../../model/RoomData";
import { RoomsService } from "../../services/rooms/rooms.service";
import { Button } from "../atoms/button/button";

interface IPokerRoomStatus {
  roomStatus?: number;
  revealingTimeout?: number;
  isRevealed?: boolean;
}

export const PokerRoomStatus = ({
  roomStatus,
  revealingTimeout,
  isRevealed,
}: IPokerRoomStatus) => {
  const router = useRouter();

  const { id } = router.query;

  const { t } = useTranslation("common");

  const [voteLoading, setVoteLoading] = useState(false);

  const parseActionsAndTextBasedOnStatus = (roomStatus?: number) => {
    const states: { [status: number]: string } = {
      1: t("poker.actions.reveal-votes"),
      2: t("poker.actions.restart-votes"),
    };

    if (!roomStatus) return;

    return states[roomStatus];
  };

  const stateHandler: { [key: number]: () => React.ReactElement } = {
    1: () => {
      return (
        <Button
          loading={voteLoading}
          onClick={() =>
            RoomsService.UPDATE_ROOM({
              roomId: id,
              key: "status",
              value: RoomDataStatus.REVEALED,
            })
          }
        >
          {parseActionsAndTextBasedOnStatus(roomStatus) || "Carregando..."}
        </Button>
      );
    },

    2: () => {
      return (
        <Tag fontSize="lg" colorScheme="purple" fontWeight={600}>
          {t("poker.actions.revealing-in")} {revealingTimeout}
        </Tag>
      );
    },

    3: () => {
      return (
        <>
          <Button
            loading={voteLoading}
            onClick={() =>
              RoomsService.UPDATE_ROOM({
                roomId: id,
                key: "status",
                value: RoomDataStatus.PENDING,
              })
            }
          >
            {parseActionsAndTextBasedOnStatus(roomStatus) || "Carregando..."}
          </Button>
          {/* 
                    <Flex mt={2}>
                        <Tag fontSize={["sm", "sm", "lg"]} mx={2}>
                            {t("poker.actions.team-1-note")}:{" "}
                        </Tag>
                        <Tag fontSize={["sm", "sm", "lg"]} mx={2}>
                            {t("poker.actions.team-2-note")}:{" "}
                        </Tag>
                    </Flex> */}
        </>
      );
    },
  };

  return (
    <>
      {roomStatus && !isRevealed ? (
        <>{stateHandler[roomStatus]()}</>
      ) : (
        <>{stateHandler[RoomDataStatus.NOTE_REVEALED]()}</>
      )}
    </>
  );
};
