import { Box, Grid, GridItem } from "@chakra-ui/react";

import { Player } from "./player/player";

export const Home: React.FC = () => {
  return (
    <Box bg="gray.800" p={5} borderRadius="lg">
      <Grid templateColumns="1fr 1fr" gap={6} templateRows="1fr">
        <GridItem gridColumn={1}>
          <Player />
        </GridItem>
        <GridItem gridColumn={2}></GridItem>
      </Grid>
    </Box>
  );
};
