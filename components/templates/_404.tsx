import { Grid, GridItem, Heading, Img } from "@chakra-ui/react";
import { CharacterList } from "../../domain/dino-poker/interface/characters";

export const NotFoundView = () => {
  return (
    <Grid placeItems="center" h="60vh">
      <GridItem alignSelf="center">
        <Heading as="h1">Oops! 404</Heading>
        <Img src={CharacterList[1].src} w="100%" />
      </GridItem>
    </Grid>
  );
};
