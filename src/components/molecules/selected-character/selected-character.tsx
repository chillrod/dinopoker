import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Center,
  FormControl,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";

import { characters } from "../../organisms/home/characters";
import { CharacterCard } from "../../atoms/character-card/character-card";
import { character } from "../../atoms/character-card/hooks";
import { Input } from "../../atoms/input/input";

import { emitter } from "../../../service/emitter/emitter";

export const SelectedCharacter = () => {
  const [name, setName] = useState("");

  const [character, setCharacter] = useState<character | undefined>(
    characters[0]
  );

  const handleSelectedName = (event: any) => {
    setName(event.target.value);

    emitter.emit("CHARACTER_NAME", event.target.value);
  };

  useMemo(() => {
    emitter.on("SELECTED_CHARACTER", (character) => {
      if (character) setCharacter(character);
    });
  }, []);
  return (
    <>
      <SimpleGrid spacing={3} role="@dino-selectchar">
        <Center>
          <CharacterCard isSelectedScreen character={character} />
        </Center>
        <Box>
          <FormControl isInvalid={!name.length}>
            <FormLabel>Nome</FormLabel>
            <Input
              onChange={(e) => handleSelectedName(e)}
              required
              disabled={!character?.src?.length}
              placeholder="Choosen name"
            />
          </FormControl>
        </Box>
      </SimpleGrid>
    </>
  );
};
