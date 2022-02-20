import { Box, Flex, Heading, Select, Stack, Text } from "@chakra-ui/react";

import YellowDino from "../../assets/yellow.gif";
import BlueDino from "../../assets/blue.gif";

import { CharacterWrapper } from "../../components/molecules/character-wrapper/character-wrapper";

export const Home: React.FC = () => {
  const characters = [
    {
      id: 0,
      src: YellowDino,
    },
    {
      id: 1,
      src: BlueDino,
    },
    {
      id: 2,
      src: BlueDino,
    },
    {
      id: 3,
      src: BlueDino,
    },
    {
      id: 4,
      src: BlueDino,
    },
  ];

  return (
    <Box p={6} bg="dino.base3" minHeight="100vh">
      <Heading textAlign="center" size="md">
        dino {""}
        <Text as="span" color="dino.primary">
          planningpoker
        </Text>
      </Heading>

      <Text fontSize="sm">To begin with</Text>
      <Text fontSize="lg" fontWeight="semibold">
        Select your avatar
      </Text>
      <Flex gap={3} justifyContent="space-between" mt={3}>
        <Stack m={2}>
          <CharacterWrapper characters={characters} />
          <Box>
            {/* <Text>Room configuration</Text>
            <Select bg="dino.secondary" border="none">
              <option>Modified Fibonacci (0.5, 2)</option>
              <option>2</option>
            </Select> */}
          </Box>
        </Stack>
        <Box
          m={2}
          bg="dino.secondary"
          borderRadius="lg"
          width="100%"
          height="fit"
        ></Box>
      </Flex>
    </Box>
  );
};
