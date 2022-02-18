import { useState, useMemo } from "react";

import { Box, Button, Stack, Grid, GridItem, Text } from "@chakra-ui/react";

import { Form } from "./form";
import { Character } from "./character";

import click from "../fx/click.wav";

interface DinoState {
  [state: string]: () => void;
  advance: () => void;
  back: () => void;
}

export const Model: React.FC = () => {
  const [selectedDino, setSelectedDino] = useState(0);

  const audio = useMemo(() => new Audio(click), []);

  const changeDino = (state: string) => {
    audio.play();

    const dinoState: DinoState = {
      advance: () => setSelectedDino(selectedDino + 1),
      back: () => setSelectedDino(selectedDino - 1),
    };

    if (state === "advance" && selectedDino >= 3) return setSelectedDino(0);
    if (state === "back" && selectedDino <= 0) return setSelectedDino(3);

    return dinoState[state]();
  };

  return (
    <Box bg="purple.800" marginTop={2} borderRadius="lg">
      <Grid templateColumns="1fr 1fr" alignItems="center">
        <GridItem>
          <Character changeDino={changeDino} selectedDino={selectedDino} />
        </GridItem>
        <GridItem justifySelf="center" borderRadius="lg">
          <Stack spacing={5} p={3}>
            <Form />
            <Box>
              <Stack spacing={3}>
                <Text textAlign="center" fontSize="sm" fontWeight={700}>
                  Or you can
                </Text>
                <Button>
                  <Text textAlign="center" fontSize="md" fontWeight={700}>
                    Create a Room
                  </Text>
                </Button>
              </Stack>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};
