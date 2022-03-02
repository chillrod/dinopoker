import { Box, Flex, Grid, GridItem, Img, SimpleGrid } from "@chakra-ui/react";
import { CardPoints } from "../../components/atoms/card-points/card-points";
import { character } from "../../components/atoms/character-card/hooks";
import { ChatMessages } from "../../components/molecules/chat-messages/chat-messages";
import { PokerTable } from "../../components/molecules/poker-table/poker-table";
import { pointSystem } from "../../components/molecules/room-config/pointSystem";
import { Menu } from "../menu/menu";

interface IRound {
  character?: character;
  pointSystem?: number[];
  name?: string;
}

export const Round = () => {
  return (
    <Box
      maxWidth={{
        lg: "800px",
      }}
      sx={{
        margin: "0 auto",
      }}
    >
      <Grid templateColumns="auto 1fr" alignItems="center" gap={3}>
        <GridItem alignSelf="center" gridColumn={2} gridRow={1}>
          <PokerTable />
        </GridItem>
        <GridItem
          gridRow={2}
          gridColumn={2}
          w="100%"
          justifySelf="center"
          overflow="auto"
        >
          <Flex gap={2}>
            {pointSystem[0].value.map((item) => (
              <Box width="100%">
                <CardPoints point={item} />
              </Box>
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
