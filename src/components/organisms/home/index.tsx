import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { IPlayerData } from "../dto/playerdata";

import { CharacterWrapper } from "../../molecules/character-wrapper/character-wrapper";
import { SelectedCharacter } from "../../molecules/selected-character/selected-character";
import { RoomConfig } from "../../molecules/room-config/room-config";
import { RoomStart } from "../../molecules/room-start/room-start";

import { characters } from "./characters";

import { TitleSubtitle } from "../../atoms/title-subtitle";
import { DinoPoker } from "../../atoms/dinopoker";

import { socket } from "../../../service/socket";
import { emitter } from "../../../service/emitter/emitter";

import { v4 } from "uuid";

export const Home: React.FC = () => {
  const [characterName, setCharacterName] = useState("");

  const navigate = useNavigate();

  const [character, setCharacter] = useState<number>(characters[0].id);

  const handleJoinRoom = (room: string) => {
    const data: IPlayerData = {
      id: v4(),
      name: characterName,
      character: character,
      vote: null,
      room,
    };

    emitter.emit("CURRENT_PLAYER", data);

    socket.emit("joinRoom", data);

    socket.on("msgCurrentPlayerData", (data) => {
      if (data === "Error") return;

      if (data === "Joined Room") return navigate(`/room/${room}`);
    });
  };

  useEffect(() => {
    emitter.on("CHARACTER_NAME", (name) => setCharacterName(name));

    emitter.on("SELECTED_CHARACTER", (character) => setCharacter(character.id));
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
        <TitleSubtitle title="to start" subtitle="Choose a color mood" />
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
