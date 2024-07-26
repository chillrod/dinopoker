import { Flex, Grid, GridItem, Tag } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";
import { Share2 } from "react-feather";

import { IPlayerData } from "../../../model/PlayerData";
import { RoomDataStatus } from "../../../model/RoomData";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { PokerCharacter } from "../../atoms/poker-character/poker-character";
import { PokerRoomStatus } from "../../templates/_poker-roomstatus";
import ConfettiExplosion from "react-confetti-explosion";

export interface IPokerRoundData {
  roomStatus?: RoomDataStatus;
  currentPlayers: any;
}

export const PokerRoundData = ({
  currentPlayers,
  roomStatus,
}: IPokerRoundData) => {
  const { t } = useTranslation("common");

  const [currentPlayerPositions, setCurrentPlayerPositions] = useState<{
    [key: string]: IPlayerData[];
  }>({});

  const [isExploding, setIsExploding] = useState(false);

  const [revealingTimeout, setRevealingTimeout] = useState(3);
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
      ["top"]: [...currentPlayers.slice(0, 3)],
      ["bottom"]: [...currentPlayers.slice(3, 6)],
      ["left"]: [...currentPlayers.slice(6, 9)],
      ["right"]: [...currentPlayers.slice(9, 12)],
    });
  }, [currentPlayers]);

  useEffect(() => {
    if (roomStatus === RoomDataStatus.PENDING)
      [setIsRevealed(false), setRevealingTimeout(3)];

    if (revealingTimeout === 0) {
      setIsRevealed(true);

      setIsExploding(true);

      return;
    }

    if (roomStatus === RoomDataStatus.REVEALED) {
      const countInterval = setInterval(() => {
        setRevealingTimeout(revealingTimeout - 1);
      }, 800);

      return () => clearInterval(countInterval);
    }
  }, [roomStatus, revealingTimeout]);

  return (
    <>
      {isExploding && (
        <ConfettiExplosion
          onComplete={() => setIsExploding(false)}
          zIndex={20}
        />
      )}
      <Grid
        minH="30vh"
        justifyContent="center"
        alignItems="center"
        gridTemplateColumns="10% 50% 10%"
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
          h="100px"
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
            {currentPlayers?.length > 1 ? (
              <PokerRoomStatus
                roomStatus={roomStatus}
                revealingTimeout={revealingTimeout}
                isRevealed={isRevealed}
              />
            ) : (
              <Flex mt={2} direction="column">
                <Tag mb={2} fontSize={["sm", "sm", "lg"]} mx={2}>
                  Invite your team mates
                </Tag>
                <IconButton
                  onClick={() => copyRoomLink()}
                  ariaLabel="Share"
                  icon={<Share2 />}
                />
              </Flex>
            )}
          </Flex>
        </GridItem>

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
              <AnimatePresence>
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
                          status={roomStatus}
                          isRevealed={isRevealed}
                        />
                      ) : (
                        <></>
                      )}
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
