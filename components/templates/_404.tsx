import { Grid, GridItem, Heading, Img } from "@chakra-ui/react";

import { CharacterList } from "../../config/characters";

export const NotFoundView = () => {
  return (
    <Grid placeItems="center" h="60vh">
      <GridItem alignSelf="center">
        <Heading as="h1">Oops!, This page does not exist</Heading>
        <Img src={CharacterList[1].src} w="100%" maxW={250} margin="0 auto" mt={4} />
      </GridItem>
    </Grid>
  );
};
