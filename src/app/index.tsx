import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { CardPoints } from "../components/atoms/card-points/card-points";
import { CharacterVote } from "../components/atoms/character-vote/character-vote";
import { DinoPoker } from "../components/atoms/dinopoker";
import { InputNumber } from "../components/atoms/input-number/input-number";
import { ChatMessages } from "../components/molecules/chat-messages/chat-messages";
import { PokerTable } from "../components/molecules/poker-table/poker-table";
import { Home } from "../organisms/home";
import { Menu } from "../organisms/menu/menu";
import { Round } from "../organisms/round";

export const App = () => {
  return (
    <Flex justifyContent="center">
      <Grid gridTemplateRows="auto 1fr">
        <GridItem alignSelf="start" gridRow={2}>
          <Home />
        </GridItem>
      </Grid>
    </Flex>
  );
};
