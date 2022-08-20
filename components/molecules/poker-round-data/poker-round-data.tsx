import { Flex, Grid, GridItem, Img, Tag } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useMemo, useState } from "react";
import { Share2 } from "react-feather";

import { IPlayerData } from "../../../model/PlayerData";
import { RoomDataStatus } from "../../../model/RoomData";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { Button } from "../../atoms/button/button";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { PokerCharacter } from "../../atoms/poker-character/poker-character";
import { PokerRoomStatus } from "../../templates/_poker-roomstatus";

export interface IPokerRoundData {
  updateRoomStatus: (roomStatus: string) => void;
  roomStatus?: RoomDataStatus;
  currentPlayers: any;
}

export const PokerRoundData = ({
  currentPlayers,
  roomStatus,
  updateRoomStatus,
}: IPokerRoundData) => {
  const { t } = useTranslation("common");

  const [currentPlayerPositions, setCurrentPlayerPositions] = useState<{
    [key: string]: IPlayerData[];
  }>({});

  const [isRevealed, setIsRevealed] = useState(false);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);

    NotificationsService.emitToast({
      message: t("poker.actions.copy-link-success"),
      state: "success",
    });
  };


  useMemo(() => {
    if (!currentPlayers) return;


    setCurrentPlayerPositions({
      ["top"]: [...currentPlayers.slice(0, 4)],
      ["bottom"]: [...currentPlayers.slice(4, 8)],
      ["left"]: [...currentPlayers.slice(8, 12)],
      ["right"]: [...currentPlayers.slice(12, 16)],
    });

  }, [currentPlayers]);

  // useEffect(() => {
  //   if (roomStatus === "PENDING")
  //     [setIsRevealed(false), setRevealingTimeout(3)];

  //   if (revealingTimeout === 0) {
  //     setIsRevealed(true);

  //     return;
  //   }

  //   if (roomStatus === "REVEALED") {
  //     const countInterval = setInterval(() => {
  //       setRevealingTimeout(revealingTimeout - 1);
  //     }, 800);

  //     return () => clearInterval(countInterval);
  //   }
  // }, [roomStatus, revealingTimeout]);

  return (
    <Grid
      minH="30vh"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns="10% 60% 10%"
      gridTemplateRows="auto auto auto"
      gap={4}
      gridTemplateAreas={`
                       "left top right"
                       "left table right"
                       "left bottom right"
                       `}
    >
      <GridItem
        bg="dino.base3"
        p={5}
        minH="150px"
        height={["10em", "8em"]}
        borderRadius="full"
        area="table"
      >
        <Flex
          h="100%"
          gap={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <PokerRoomStatus
            roomStatus={roomStatus}
            isRevealed={isRevealed}
          />
          {/* {renderTableStatus(roomStatus, isRevealed)} */}
        </Flex>
      </GridItem>

      <AnimatePresence>
        <>
          {Object.keys(currentPlayerPositions).map((playerPosition) => (
            <GridItem
              justifySelf="center"
              key={playerPosition}
              area={playerPosition}
            >
              <Flex
                gap={4}
                direction={
                  playerPosition === "left" || playerPosition === "right"
                    ? "column"
                    : "row"
                }
              >
                {currentPlayerPositions[playerPosition].map(
                  (player: IPlayerData) => (
                    <motion.div
                      key={player?.id}
                      initial={{ scale: 0.97 }}
                      animate={{ scale: [1.1, 0.99, 1] }}
                      exit={{ scale: 0.97 }}
                    >
                      {player ? (
                        <PokerCharacter
                          character={player}
                          status="PENDING"
                          handleVoteFunction={() => ''}
                        // status={roomStatus}
                        // handleVoteFunction={parseSecretVoteBasedOnRoomStatus}
                        />
                      ) : <></>}
                    </motion.div>
                  )
                )}
              </Flex>
            </GridItem>
          ))}
        </>
      </AnimatePresence>
    </Grid >
  );
};
