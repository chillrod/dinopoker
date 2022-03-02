import { Box, SimpleGrid } from "@chakra-ui/react";
import { Text, Grid, GridItem, Img } from "@chakra-ui/react";

import { Button } from "../../atoms/button/button";
import { CharacterVote } from "../../atoms/character-vote/character-vote";

import { characters } from "../../../organisms/home/characters";

export const PokerTable = () => {
  const renderTableMargin = (index: number) => {
    if (index === 0 || index === 5) return "2em 0 2em 0";
    if (index === 6 || index === 11) return "-2em 0 -2em 0";
  };

  return (
    <>
      <Grid templateColumns="1fr">
        <GridItem
          gridRow={1}
          gridColumn={1}
          justifySelf="center"
          sx={{
            zIndex: 2,
          }}
        >
          {false && (
            <SimpleGrid spacing={2} justifyContent="center">
              <Text justifySelf="center" fontSize="lg">
                Waiting for players
              </Text>
              <Img
                justifySelf="center"
                src={characters[0].src}
                width="4em"
                height="4em"
              />
              <Box justifySelf="center">
                <Button action="confirm">Share room</Button>
              </Box>
            </SimpleGrid>
          )}
          {true && (
            <SimpleGrid gap={6} columns={6}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((items, index) => (
                <Box
                  w="8ch"
                  h="11ch"
                  key={items}
                  sx={{
                    margin: renderTableMargin(index),
                  }}
                >
                  <CharacterVote />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </GridItem>
        <GridItem
          gridRow={1}
          gridColumn={1}
          p={9}
          sx={{
            zIndex: 1,
          }}
        >
          <Box
            bg="dino.secondary"
            width="100%"
            height="100%"
            borderRadius="full"
          ></Box>
        </GridItem>
      </Grid>
    </>
  );
};
