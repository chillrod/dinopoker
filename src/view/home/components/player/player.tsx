import { useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Image, Text, Flex, Button, Stack } from "@chakra-ui/react";

import YellowDino from "./assets/yellow.gif";
import GreenDino from "./assets/green.gif";
import RedDino from "./assets/red.gif";
import BlueDino from "./assets/blue.gif";

import { changeDino } from "./hooks/changeDino";

export const Player = () => {
  const [selectedDino, setSelectedDino] = useState(0);

  const dino = [YellowDino, GreenDino, RedDino, BlueDino];

  const handleChangeDino = (state: string) => {
    const action = changeDino(state, selectedDino);

    setSelectedDino(action);
  };

  return (
    <Box padding={6}>
      <Image
        src={dino[selectedDino]}
        boxSize="250px"
        role="@dino-image"
        alt="Character image"
      />
      <Stack spacing={3}>
        <Text
          as="h2"
          fontSize="sm"
          color="purple.100"
          fontWeight={700}
          textAlign="center"
        >
          Select your Player
        </Text>
        <Flex justify="space-around">
          <Button
            role="@dino-buttonback"
            border="0"
            variant="outline"
            colorScheme="purple"
            onClick={() => handleChangeDino("back")}
          >
            <ArrowLeftIcon cursor="pointer" color="purple.500" />
          </Button>
          <Button
            role="@dino-buttonnext"
            border="0"
            variant="outline"
            colorScheme="purple"
            onClick={() => handleChangeDino("next")}
          >
            <ArrowRightIcon cursor="pointer" color="purple.500" />
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
