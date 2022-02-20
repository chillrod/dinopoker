import { useState } from "react";

import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { BaseBox } from "../../atoms/base-box/base-box";
import { CharacterCard } from "../../atoms/character-card/character-card";
import { character } from "../../atoms/character-card/hooks";
import { IconButton } from "../../atoms/icon-button/icon-button";

interface ICharacterWrapper {
  characters: character[];
}
export const CharacterWrapper = ({ characters }: ICharacterWrapper) => {
  const [selected, setSelected] = useState(0);

  const handleCharacter = (character: character) => {
    setSelected(character.id);
  };

  const handleArrowNext = (id: number) => {
    const lastCharacter = characters.length - 1;

    if (id === lastCharacter) return setSelected(0);

    return setSelected(id + 1);
  };

  const handleArrowBack = (id: number) => {
    const lastCharacter = characters.length - 1;

    if (id === 0) return setSelected(lastCharacter);

    return setSelected(id - 1);
  };

  return (
    <Container m={0} p={0} maxWidth="sm">
      <Stack spacing={3}>
        <Box overflowX="scroll" maxWidth="100%">
          <Flex gap={2}>
            {characters.map((character) => (
              <Box>
                <CharacterCard
                  isSelected={selected}
                  onClick={() => handleCharacter(character)}
                  key={character.id}
                  character={character}
                />
              </Box>
            ))}
          </Flex>
        </Box>
        <BaseBox>
          <Flex justifyContent="space-around">
            <IconButton
              onClick={() => handleArrowBack(selected)}
              ariaLabel="Previous"
              icon={<ChevronLeftIcon />}
            />
            <IconButton
              onClick={() => handleArrowNext(selected)}
              ariaLabel="Next"
              icon={<ChevronRightIcon />}
            />
          </Flex>
        </BaseBox>
      </Stack>
    </Container>
  );
};
