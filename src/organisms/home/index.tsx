import { useEffect, useState } from "react";

import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";

import { CharacterWrapper } from "../../components/molecules/character-wrapper/character-wrapper";
import { SelectedCharacter } from "../../components/molecules/selected-character/selected-character";
import { RoomConfig } from "../../components/molecules/room-config/room-config";
import { RoomStart } from "../../components/molecules/room-start/room-start";

import { TitleSubtitle } from "../../components/atoms/title-subtitle";
import { DinoPoker } from "../../components/atoms/dinopoker";
import { IOption } from "../../components/atoms/select/select";
import { character } from "../../components/atoms/character-card/hooks";
import { emitter } from "../../service/emitter";
import { characters } from "./characters";

export const Home: React.FC = () => {
  const [selectedConfig, setSelectedConfig] = useState<IOption>();

  const [characterSelected, setCharacterSelected] = useState<
    character | undefined
  >();

  const handleCreateRoom = (event: string) => {
    emitter.emit("CREATE_ROOM", {
      character: characterSelected,
      pointSystem: selectedConfig,
    });

    return event;
  };

  useEffect(() => {
    emitter.on("SELECTED_CHARACTER", (data) => {
      setCharacterSelected(data);
    });

    emitter.on("SELECTED_CONFIGURATION", (data) => {
      setSelectedConfig(data);
    });
  }, []);

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
            <CharacterWrapper characters={characters} />
            <Box>
              <RoomConfig />
            </Box>
          </SimpleGrid>
        </Container>
        <Container m={0} p={0}>
          <Flex direction="column" justifyContent="space-between" height="100%">
            <SelectedCharacter />
            <Box mt="auto">
              <RoomStart />
            </Box>
          </Flex>
        </Container>
      </SimpleGrid>
    </Box>
  );
};
