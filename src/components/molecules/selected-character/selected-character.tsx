import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";

import { CharacterCard } from "../../atoms/character-card/character-card";

import { character } from "../../atoms/character-card/hooks";
import { Input } from "../../atoms/input/input";
import { TitleSubtitle } from "../../atoms/title-subtitle";

interface ISelectedCharacter {
  character?: character;
}

export const SelectedCharacter = ({ character }: ISelectedCharacter) => {
  return (
    <>
      <SimpleGrid spacing={3} role="@dino-selectchar">
        {!character && (
          <Center role="@dino-nocharacter">
            <Button
              outline="none"
              disabled
              size="lg"
              bg="dino.secondary"
              width={{
                sm: "5em",
                md: "5em",
                lg: "8em",
              }}
              height={{
                sm: "5em",
                md: "5em",
                lg: "8em",
              }}
            ></Button>
          </Center>
        )}
        {character && (
          <>
            <Center>
              <CharacterCard isSelectedScreen character={character} />
            </Center>
          </>
        )}
        <Box>
          <TitleSubtitle title="" subtitle="Type your name" />
          <Input disabled={!character?.src.length} placeholder="Patrinho" />
        </Box>
      </SimpleGrid>
    </>
  );
};
