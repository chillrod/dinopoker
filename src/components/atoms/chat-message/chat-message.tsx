import { Grid, GridItem, Img, Box, Text } from "@chakra-ui/react";
import { characters } from "../../organisms/home/characters";
import { BaseBox } from "../base-box/base-box";

export const ChatMessage = () => {
  return (
    <BaseBox>
      <Grid p={2} templateColumns="auto 1fr" gap={3} alignItems="center">
        <GridItem>
          <Box bg="dino.base2" w="3em" h="3em" borderRadius="full">
            <Img src={characters[0].src} boxSize="100%" />
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text as="span" fontSize="sm" fontWeight={600}>
              Patrinho says
            </Text>
          </Box>
          <Box>
            <Text as="span">Can i reveal?</Text>
          </Box>
        </GridItem>
      </Grid>
    </BaseBox>
  );
};