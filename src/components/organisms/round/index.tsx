import { socket } from "../../../service/socket";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emitter } from "../../../service/emitter/emitter";

import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { CardPoints } from "../../atoms/card-points/card-points";
import { PokerTable } from "../../molecules/poker-table/poker-table";
import { pointSystem } from "../../molecules/room-config/pointSystem";
import { IPlayerData } from "../dto/playerdata";

interface IRound {
  currentPlayer?: IPlayerData;
}

export const Round = ({ currentPlayer }: IRound) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const storagePlayer = localStorage.getItem("character");
  const cCurrentPlayer =
    currentPlayer || JSON.parse(storagePlayer ? storagePlayer : "{}");

  const emitNewPoint = (point: number | null) => {
    const updatedVote = {
      ...cCurrentPlayer,
      vote: point,
    };

    socket.emit("changeVote", updatedVote);

    socket.emit("currentData", updatedVote);
  };

  return (
    <Box>
      <Grid
        templateColumns="auto 1fr"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <GridItem
          alignSelf="center"
          gridColumn={2}
          gridRow={1}
          maxH={{
            sm: "20ch",
            md: "300px",
            lg: "500px",
          }}
          overflow="auto"
        >
          <PokerTable />
        </GridItem>
        <GridItem gridRow={2} gridColumn={2} overflow="auto">
          <Flex gap={2}>
            {pointSystem[0].value.map((item) => (
              <Box width="100%" mx={1}>
                <CardPoints
                  selected={selectedPoint === item}
                  onClick={(e) => emitNewPoint(e)}
                  point={item}
                />
              </Box>
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
