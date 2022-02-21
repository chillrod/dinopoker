import { useState } from "react";

import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Tag,
} from "@chakra-ui/react";

import YellowDino from "../../assets/yellow.gif";
import BlueDino from "../../assets/blue.gif";
import RedDino from "../../assets/red.gif";
import GreenDino from "../../assets/green.gif";

import { CharacterWrapper } from "../../components/molecules/character-wrapper/character-wrapper";
import { SelectedCharacter } from "../../components/molecules/selected-character/selected-character";
import { RoomConfig } from "../../components/molecules/room-config/room-config";
import { RoomStart } from "../../components/molecules/room-start/room-start";

import { TitleSubtitle } from "../../components/atoms/title-subtitle";
import { DinoPoker } from "../../components/atoms/dinopoker";
import { IOption } from "../../components/atoms/select/select";
import { character } from "../../components/atoms/character-card/hooks";

export const Home: React.FC = () => {
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
      src: GreenDino,
    },
    {
      id: 3,
      src: RedDino,
    },
  ];

  const [characterSelected, setCharacterSelected] = useState<
    character | undefined
  >(characters[0]);

  const handleSelectedCharacter = (value?: character) => {
    setCharacterSelected(value);

    return characterSelected;
  };

  const handleRoomConfig = (config: IOption) => {
    setSelectedConfig(config);

    return selectedConfig;
  };

  const handleCreateRoom = (event: string) => {
    return event;
  };

  return (
    <Box
      p={6}
      maxWidth={{
        lg: "800px",
      }}
      sx={{
        margin: "0 auto",
      }}
    >
      <DinoPoker />
      <TitleSubtitle title="to begin with" subtitle="Select a character" />
      <SimpleGrid columns={2} spacing={6}>
        <Container m={0} p={0}>
          <SimpleGrid columns={1} spacing={12}>
            <CharacterWrapper
              selectedCharacter={handleSelectedCharacter}
              characters={characters}
            />
            <Box>
              <RoomConfig selectedConfig={handleRoomConfig} />
            </Box>
          </SimpleGrid>
        </Container>
        <Container m={0} p={0}>
          <Flex direction="column" justifyContent="space-between" height="100%">
            <SelectedCharacter character={characterSelected} />
            <Box mt="auto">
              <RoomStart onCreateRoom={handleCreateRoom} />
            </Box>
          </Flex>
        </Container>
      </SimpleGrid>
    </Box>
  );
};
