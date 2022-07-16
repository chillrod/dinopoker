import { Flex, Grid, GridItem, Img, Tag } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useMemo, useState } from "react";
import { Share2 } from "react-feather";

import { IPlayerData } from "../../../model/PlayerData";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { Button } from "../../atoms/button/button";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { PokerCharacter } from "../../atoms/poker-character/poker-character";

export interface IPokerRoundData {
  voteLoading: boolean;
  updateRoomStatus: (roomStatus: string) => void;
  roomStatus: string;
  currentPlayers: any;
}

export const PokerRoundData = ({
  currentPlayers,
  roomStatus,
  updateRoomStatus,
  voteLoading,
}: IPokerRoundData) => {
  const { t } = useTranslation("common");

  const [currentPlayerPositions, setCurrentPlayerPositions] = useState<{
    [key: string]: IPlayerData[];
  }>({});

  const [revealingTimeout, setRevealingTimeout] = useState(3);
  const [isRevealed, setIsRevealed] = useState(false);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);

    NotificationsService.emitToast({
      message: t("poker.actions.copy-link-success"),
      state: "success",
    });
  };

  const parseSecretVoteBasedOnRoomStatus = (status: string, vote: number) => {
    const states: { [status: string]: string | number } = {
      PENDING: "-",
      REVEALED: vote,
    };

    if (status === "REVEALED" && !isRevealed) return "-";

    return states[status];
  };

  const parseActionsAndTextBasedOnStatus = (roomStatus: string) => {
    const states: { [status: string]: string } = {
      PENDING: t("poker.actions.reveal-votes"),
      REVEALED: t("poker.actions.restart-votes"),
    };

    return states[roomStatus];
  };

  const calculateMd = (state: string): { max: number; all: number[] } => {
    const states: { [status: string]: () => any } = {
      team1: () => {
        const frontEndMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 1)
          .map((player) => currentPlayers[player].vote);

        if (!frontEndMd.length) return 0;

        return { max: Math.max(...frontEndMd), all: frontEndMd };
      },

      team2: () => {
        const backendMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 2)
          .map((player) => currentPlayers[player].vote);

        if (!backendMd.length) return 0;

        return { max: Math.max(...backendMd), all: backendMd };
      },
    };

    return states[state]();
  };

  const renderTableStatus = (roomStatus: string, isRevealed: boolean) => {
    const stateHandler: { [key: string]: () => React.ReactElement } = {
      PENDING: () => {
        return (
          <Button
            loading={voteLoading}
            onClick={() => updateRoomStatus(roomStatus)}
          >
            {parseActionsAndTextBasedOnStatus(roomStatus) || "Carregando..."}
          </Button>
        );
      },

      REVEALING: () => {
        return (
          <Flex direction="column" justifyContent="center">
            <Tag fontSize="lg" colorScheme="purple" fontWeight={600}>
              {t("poker.actions.revealing-in")} {revealingTimeout}
            </Tag>
            <Img src="/dino1.svg" w="50px" margin="0 auto" mt={5} />
          </Flex>
        );
      },

      REVEALED: () => {
        return (
          <>
            <Button
              loading={voteLoading}
              onClick={() => updateRoomStatus(roomStatus)}
            >
              {parseActionsAndTextBasedOnStatus(roomStatus) || "Carregando..."}
            </Button>

            <Flex mt={2}>
              <Tag fontSize={["sm", "sm", "lg"]} mx={2}>
                {t("poker.actions.team-1-note")}:{" "}
                {calculateMd("team1").max || 0}
              </Tag>
              <Tag fontSize={["sm", "sm", "lg"]} mx={2}>
                {t("poker.actions.team-2-note")}:{" "}
                {calculateMd("team2").max || 0}
              </Tag>
            </Flex>
          </>
        );
      },
    };

    if (!roomStatus) return;

    if (revealingTimeout > 0 && roomStatus === "REVEALED")
      return stateHandler["REVEALING"]();

    if (currentPlayers.length === 1) {
      return (
        <>
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
        </>
      );
    }

    return stateHandler[roomStatus]();
  };

  useMemo(() => {
    const players = Object.keys(currentPlayers).map((player) => {
      return {
        ...currentPlayers[player],
      };
    });

    setCurrentPlayerPositions({
      ["top"]: [...players.slice(0, 4)],
      ["bottom"]: [...players.slice(4, 8)],
      ["left"]: [...players.slice(8, 12)],
      ["right"]: [...players.slice(12, 16)],
    });
  }, [currentPlayers]);

  useEffect(() => {
    if (roomStatus === "PENDING")
      [setIsRevealed(false), setRevealingTimeout(3)];

    if (revealingTimeout === 0) {
      setIsRevealed(true);

      return;
    }

    if (roomStatus === "REVEALED") {
      const countInterval = setInterval(() => {
        setRevealingTimeout(revealingTimeout - 1);
      }, 800);

      return () => clearInterval(countInterval);
    }
  }, [roomStatus, revealingTimeout]);

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
          {renderTableStatus(roomStatus, isRevealed)}
        </Flex>
      </GridItem>
      <AnimatePresence>
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
                    key={player.id}
                    initial={{ scale: 0.97 }}
                    animate={{ scale: [1.1, 0.99, 1] }}
                    exit={{ scale: 0.97 }}
                  >
                    <PokerCharacter
                      character={player}
                      status={roomStatus}
                      handleVoteFunction={parseSecretVoteBasedOnRoomStatus}
                    />
                  </motion.div>
                )
              )}
            </Flex>
          </GridItem>
        ))}
      </AnimatePresence>
    </Grid>
  );
};
