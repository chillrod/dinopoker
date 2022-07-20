import { Grid, GridItem, Img, Box, Text } from "@chakra-ui/react";
import { CharacterList } from "../../../config/characters";

interface IChatMessage {
  character?: number;
  name?: string;
  message?: string;
}

export const ChatMessage = ({ message, name, character }: IChatMessage) => {
  return (
    <Box bg="dino.secondary" borderRadius="md">
      <Grid
        role="@dino-chatmessage"
        p={2}
        templateColumns="auto 1fr"
        gap={3}
        alignItems="center"
      >
        <GridItem>
          <Box bg="dino.base2" w="3em" h="3em" borderRadius="full">
            <Img
              src={CharacterList[character ? character : 0].src}
              boxSize="100%"
            />
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text as="span" fontSize="sm" fontWeight={600}>
              {name} says
            </Text>
          </Box>
          <Box>
            <Text as="span">{message}</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
