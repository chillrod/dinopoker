import { useMemo, useState } from "react";

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
import { useTranslation } from "react-i18next";
import { PlayerService } from "../../../service/player/player.service";

export const SelectedCharacter = () => {
  const [name, setName] = useState("");

  const { t } = useTranslation();

  const [character, setCharacter] = useState<character | undefined>(
    characters[0]
  );

  const handleSelectedName = (event: any) => {
    setName(event.target.value);

    PlayerService.setCharacterName(event.target.value);
  };

  useMemo(() => {
    emitter.on("SELECTED_CHARACTER", (character) => {
      if (character) setCharacter(character);
    });
  }, []);
  return (
    <>
      <SimpleGrid spacing={0} role="@dino-selectchar">
        <Center>
          <CharacterCard isSelectedScreen character={character} />
        </Center>
        <Box>
          <FormControl isInvalid={!name.length}>
            <FormLabel>{t("home.name")}</FormLabel>
            <Input
              onChange={(e) => handleSelectedName(e)}
              disabled={!character?.src?.length}
              placeholder={t("home.type-your-name")}
            />
          </FormControl>
        </Box>
      </SimpleGrid>
    </>
  );
};
