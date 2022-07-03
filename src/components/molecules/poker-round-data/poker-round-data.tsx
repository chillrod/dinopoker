import { Flex, Grid, GridItem, Tag, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
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

  const parseSecretVoteBasedOnRoomStatus = (status: string, vote: number) => {
    const states: { [status: string]: string | number } = {
      PENDING: "-",
      REVEALED: vote,
    };

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

  return (
    <Grid
      minH="30em"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns="8em 50% 8em"
      gridTemplateRows="auto auto auto"
      gridTemplateAreas={`
                       "left top right"
                       "left table right"
                       "left bottom right"
                       `}
    >
      <GridItem
        justifySelf="center"
        w="100%"
        bg="gray.700"
        height="100%"
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
          <Button
            loading={voteLoading}
            onClick={() => updateRoomStatus(roomStatus)}
          >
            {parseActionsAndTextBasedOnStatus(roomStatus) || "Carregando..."}
          </Button>
          {roomStatus === "REVEALED" && (
            <>
              <Flex mt={2}>
                <Tag color="yellow.300" fontSize="lg" mx={2}>
                  Nota Frontend: {calculateMd("frontend")}
                </Tag>
                <Tag color="blue.200" fontSize="lg" mx={2}>
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
            {currentPlayerPositions[playerPosition].map(
              (player: IPlayerData) => (
                <div key={player.id}>
                  <PokerCharacter
                    character={player}
                    status={roomStatus}
                    handleVoteFunction={parseSecretVoteBasedOnRoomStatus}
                  />
                </div>
              )
            )}
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};
