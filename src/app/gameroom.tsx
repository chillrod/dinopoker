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
      <Menu />
      <Grid gridTemplateRows="auto 1fr" gap={3}>
        <GridItem alignSelf="start" gridRow={1}>
          <Round currentPlayer={currentPlayer} />
        </GridItem>
      </Grid>
    </Flex>
  );
};
