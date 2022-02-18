import { useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Image,
  Text,
  Flex,
  Button,
  Tag,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import YellowDino from "./assets/yellow.gif";
import GreenDino from "./assets/green.gif";
import RedDino from "./assets/red.gif";
import BlueDino from "./assets/blue.gif";

import { changeDino } from "./hooks/changeDino";

interface DinoText {
  [dinoText: number]: string;
  0: string;
  1: string;
  2: string;
  3: string;
}

export const Player = () => {
  const [selectedDino, setSelectedDino] = useState(0);
  const [dinoText, setDinoText] = useState("Hello? ");

  const dino = [YellowDino, GreenDino, RedDino, BlueDino];

  const handleChangeDino = (state: string) => {
    const action = changeDino(state, selectedDino);

    const dinoText: DinoText = {
      0: "Ok let's vote",
      1: "Why voting at all??",
      2: "5 points for this??",
      3: "Maybe 3 points?",
    };

    setDinoText(dinoText[action]);

    setSelectedDino(action);
  };

  return (
    <Grid bg="gray.600" p={6} borderRadius="lg">
      <GridItem order="2" gridColumn="1 / -1" gridRow="1" justifySelf="end">
        <Tag colorScheme="green" variant="subtle" textAlign="center">
          {dinoText}
        </Tag>
      </GridItem>
      <GridItem gridColumn="1 / -1" gridRow="1">
        <Image
          src={dino[selectedDino]}
          boxSize="100%"
          role="@dino-image"
          p={8}
          alt="Character image"
        />
      </GridItem>
      <GridItem gridRow="2" alignSelf="end">
        <Text
          as="h2"
          fontSize="md"
          fontWeight={700}
          textAlign="center"
          mb={3}
        >
          Select your Player
        </Text>
        <Flex bg="gray.700" p={1} borderRadius="md" justify="space-around">
          <Button
            role="@dino-buttonback"
            variant="unstyled"
            _hover={{ transform: "scale(1.1)" }}
            onClick={() => handleChangeDino("back")}
          >
            <ArrowLeftIcon fontSize="sm" cursor="pointer" color="white" />
          </Button>
          <Button
            role="@dino-buttonnext"
            variant="unstyled"
            _hover={{ transform: "scale(1.1)" }}
            onClick={() => handleChangeDino("next")}
          >
            <ArrowRightIcon fontSize="sm" cursor="pointer" color="white" />
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};
