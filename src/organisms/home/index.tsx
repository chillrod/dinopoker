import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";

import { CharacterWrapper } from "../../components/molecules/character-wrapper/character-wrapper";
import { SelectedCharacter } from "../../components/molecules/selected-character/selected-character";
import { RoomConfig } from "../../components/molecules/room-config/room-config";
import { RoomStart } from "../../components/molecules/room-start/room-start";

import { characters } from "./characters";
import { emitter } from "../../service/emitter/emitter";

import { TitleSubtitle } from "../../components/atoms/title-subtitle";
import { DinoPoker } from "../../components/atoms/dinopoker";
import { socket } from "../../service/socket";

interface IPlayerData {
  id?: string;
  name?: string;
  character?: number;
  vote?: number;
  room?: string;
}

export const Home: React.FC = () => {
  const [characterName, setCharacterName] = useState("");

  const [character, setCharacter] = useState<number | undefined>(
    characters[0].id
  );

  const handleJoinRoom = (room: string) => {
    const data: IPlayerData = {
      id: "",
      name: characterName,
      character: character,
      vote: 0,
      room,
    };

    socket.emit("joinRoom", data);
  };

  useEffect(() => {
    emitter.on("CHARACTER_NAME", (name) => setCharacterName(name));

    emitter.on("SELECTED_CHARACTER", (character) =>
      setCharacter(character?.id)
    );
  }, []);

  return (
    <Box
      p={2}
      maxWidth={{
        lg: "800px",
      }}
      sx={{
        margin: "0 auto",
      }}
    >
      <DinoPoker />
      <Box py={1} px={1}>
        <TitleSubtitle title="to start" subtitle="Select a character" />
      </Box>
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
              <RoomStart joinRoom={handleJoinRoom} />
            </Box>
          </Flex>
        </Container>
      </SimpleGrid>
    </Box>
  );
};
