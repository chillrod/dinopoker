import { Grid, GridItem, Img, Text } from "@chakra-ui/react";
import { CharacterList } from "../../config/characters";

const ScreenLoading = ({ action }: { action?: string }) => {
  return (
    <Grid justifyContent="center" gridTemplateRows="1fr 1fr">
      <GridItem alignSelf="center" gridRow="2">
        <Text fontSize="2xl">{action ? action : ""} </Text>

        <Img w="100%" src={CharacterList[0].src} />
      </GridItem>
    </Grid>
  );
};

export default ScreenLoading;
