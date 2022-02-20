import { useState } from "react";

import { Box, Flex, Stack } from "@chakra-ui/react";

import YellowDino from "../../assets/yellow.gif";
import BlueDino from "../../assets/blue.gif";

import { CharacterWrapper } from "../../components/molecules/character-wrapper/character-wrapper";
import { TitleSubtitle } from "../../components/atoms/title-subtitle";
import { DinoPoker } from "../../components/atoms/dinopoker";
import { RoomConfig } from "../../components/molecules/room-config/room-config";

import { IOption } from "../../components/atoms/select/select";

export const Home: React.FC = () => {
  const [characterSelected, setCharacterSelected] = useState<number>();
  const [selectedConfig, setSelectedConfig] = useState<IOption>();

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

  const handleSelectedCharacter = (id: number) => {
    setCharacterSelected(id);

    return characterSelected;
  };

  const handleRoomConfig = (config: IOption) => {
    setSelectedConfig(config);

    return selectedConfig;
  };

  return (
    <Box p={6} bg="dino.base3" minHeight="100vh">
      <DinoPoker />
      <TitleSubtitle title="to begin with" subtitle="Select a character" />
      <Flex gap={3} mt={3}>
        <Stack spacing={1}>
          <CharacterWrapper
            selectedCharacter={handleSelectedCharacter}
            characters={characters}
          />
          <RoomConfig selectedConfig={handleRoomConfig} />
        </Stack>
      </Flex>
    </Box>
  );
};
