import { useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Image, Text, Flex, Button, Stack } from "@chakra-ui/react";

import YellowDino from "../assets/yellow.gif";
import GreenDino from "../assets/green.gif";
import RedDino from "../assets/red.gif";
import BlueDino from "../assets/blue.gif";

interface ICharacter {
  changeDino: (state: string) => void;
  selectedDino: number;
}

export const Character: React.FC<ICharacter> = ({
  changeDino,
  selectedDino,
}) => {
  const dino = [YellowDino, GreenDino, RedDino, BlueDino];

  return (
    <Box padding={6}>
      <Image boxSize="100%" src={dino[selectedDino]} alt="Character image" />
      <Stack spacing={3}>
        <Text
          as="h2"
          fontSize="sm"
          color="purple.100"
          fontWeight={700}
          textAlign="center"
        >
          Select your character
        </Text>
        <Flex justify="space-around">
          <Button
            border="0"
            variant="outline"
            colorScheme="purple"
            onClick={() => changeDino("back")}
          >
            <ArrowLeftIcon cursor="pointer" color="purple.500" />
          </Button>
          <Button
            border="0"
            variant="outline"
            colorScheme="purple"
            onClick={() => changeDino("advance")}
          >
            <ArrowRightIcon cursor="pointer" color="purple.500" />
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
