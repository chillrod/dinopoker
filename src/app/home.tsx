import { Flex, Grid, GridItem } from "@chakra-ui/react";

import { Home } from "../components/organisms/home";

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
