import { useEffect, useState } from "react";

import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import { CharacterWrapper } from "../../molecules/character-wrapper/character-wrapper";
import { SelectedCharacter } from "../../molecules/selected-character/selected-character";
import { RoomStart } from "../../molecules/room-start/room-start";

import { characters } from "./characters";

import { emitter } from "../../../service/emitter/emitter";
import { PlayerService } from "../../../service/player/player.service";

import { generate } from "short-uuid";

export const Home: React.FC = () => {
  const [characterName, setCharacterName] = useState("");

  const [character, setCharacter] = useState<number>(characters[0].id);

  const handleJoinRoom = async (name: string) => {
    const PlayerData = {
      name: characterName,
      character,
      vote: 0,
      room: name,
    };

    PlayerService.JoinRoom(PlayerData);
  };

  const handleCreateRoom = async () => {
    const PlayerData = {
      name: characterName,
      character,
      vote: 0,
      room: generate(),
    };

    PlayerService.CreateRoom(PlayerData);
  };

  useEffect(() => {
    emitter.on("CHARACTER_NAME", (name) => setCharacterName(name));

    emitter.on("SELECTED_CHARACTER", (character) => {
      if (character) setCharacter(character.id);
    });
  }, []);

  return (
    <SimpleGrid columns={2} gap={4} p={3}>
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Box />
        <CharacterWrapper characters={characters} />
      </Flex>
      <Flex
        gap={3}
        direction="column"
        justifyContent="space-between"
        height="100%"
      >
        <SelectedCharacter />
        <RoomStart
          joinRoom={(e) => handleJoinRoom(e)}
          createRoom={() => handleCreateRoom()}
        />
      </Flex>
    </SimpleGrid>
  );
};
