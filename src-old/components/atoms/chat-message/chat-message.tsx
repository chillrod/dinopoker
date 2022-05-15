import { Grid, GridItem, Img, Box, Text } from "@chakra-ui/react";
import { characters } from "../../organisms/home/characters";
import { BaseBox } from "../base-box/base-box";

interface IChatMessage {
  character: number;
  name?: string;
  message?: string;
}

export const ChatMessage = ({ message, name, character = 0 }: IChatMessage) => {
  return (
    <BaseBox>
      <Grid
        role="@dino-chatmessage"
        p={2}
        templateColumns="auto 1fr"
        gap={3}
        alignItems="center"
      >
        <GridItem>
          <Box bg="dino.base2" w="3em" h="3em" borderRadius="full">
            <Img src={characters[character].src} boxSize="100%" />
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
    </BaseBox>
  );
};
