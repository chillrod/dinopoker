import { Flex, Grid, GridItem, Img, Tag, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import { CharacterList } from "../../../config/characters";
import { IPlayerData } from "../../../model/PlayerData";
import { Button } from "../../atoms/button/button";
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
  const [currentPlayerPositions, setCurrentPlayerPositions] = useState<{
    [key: string]: IPlayerData[];
  }>({});

  const [revealingTimeout, setRevealingTimeout] = useState(3);
  const [isRevealed, setIsRevealed] = useState(false);

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
      PENDING: "Revelar votos",
      REVEALED: "Reiniciar",
    };

    return states[roomStatus];
  };

  const calculateMd = (state: string) => {
    const states: { [status: string]: () => any } = {
      frontend: () => {
        const frontEndMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 1)
          .map((player) => currentPlayers[player].vote);

        if (!frontEndMd.length) return "";

        return Math.max(...frontEndMd);
      },
      backend: () => {
        const backendMd = Object.keys(currentPlayers)
          .filter((player) => currentPlayers[player].team === 2)
          .map((player) => currentPlayers[player].vote);

        if (!backendMd.length) return "";

        return Math.max(...backendMd);
      },
    };

    return states[state]();
  };

  const calculateAverage = (team1Value: number, team2Value: number) => {
    if (team1Value > 0 && team2Value > 0) {
      return (team1Value + team2Value) / 2;
    }

    return team1Value + team2Value;
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
              Revelando {revealingTimeout}
            </Tag>
            <Img src={CharacterList[2].src} w="50%" margin="0 auto" />
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
              <Tag color="yellow.300" fontSize={["sm", "sm", "lg"]} mx={2}>
                Nota Frontend: {calculateMd("frontend")}
              </Tag>
              <Tag color="blue.200" fontSize={["sm", "sm", "lg"]} mx={2}>
                Nota Backend: {calculateMd("backend")}
              </Tag>
            </Flex>
            <Text fontSize="lg">
              Média Total:{" "}
              {calculateAverage(
                calculateMd("frontend"),
                calculateMd("backend")
              )}
            </Text>
          </>
        );
      },
    };

    if (!roomStatus) return;

    if (revealingTimeout > 0 && roomStatus === "REVEALED")
      return stateHandler["REVEALING"]();

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
      minH="50vh"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns="10% 50% 10%"
      gridTemplateRows="auto auto auto"
      gap={3}
      gridTemplateAreas={`
                       "left top right"
                       "left table right"
                       "left bottom right"
                       `}
    >
      <GridItem
        bg="gray.700"
        height={["6em", "10em"]}
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
                  <div key={player.id}>
                    <motion.div
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
                  </div>
                )
              )}
            </Flex>
          </GridItem>
        ))}
      </AnimatePresence>
    </Grid>
  );
};
