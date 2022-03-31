import { Flex, Grid, GridItem } from "@chakra-ui/react";

import { Menu } from "../components/organisms/menu/menu";
import { IPlayerData } from "../components/organisms/dto/playerdata";

import { Round } from "../components/organisms/round";

interface IGameRoom {
  currentPlayer?: IPlayerData;
}

export const GameRoom = ({ currentPlayer }: IGameRoom) => {
  return (
    <Flex justifyContent="center">
      <Grid gridTemplateRows="auto 1fr" gap={2}>
        <GridItem alignSelf="start" gridRow={2}>
          <Menu />
          <Round currentPlayer={currentPlayer} />
        </GridItem>
      </Grid>
    </Flex>
  );
};
