import { useState } from "react";

import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { BaseBox } from "../../atoms/base-box/base-box";
import { CharacterCard } from "../../atoms/character-card/character-card";
import { character } from "../../atoms/character-card/hooks";
import { IconButton } from "../../atoms/icon-button/icon-button";

interface ICharacterWrapper {
  characters: character[];
  selectedCharacter: (id: number) => void;
}
export const CharacterWrapper = ({
  characters,
  selectedCharacter,
}: ICharacterWrapper) => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (id: number) => {
    selectedCharacter(id);
    return setSelected(id);
  };

  const handleCharacter = (character: character) => {
    handleSelect(character.id);
  };

  const handleArrowNext = (id: number) => {
    const lastCharacter = characters.length - 1;

    if (id === lastCharacter) return handleSelect(0);

    return handleSelect(id + 1);
  };

  const handleArrowBack = (id: number) => {
    const lastCharacter = characters.length - 1;

    if (id === 0) return handleSelect(lastCharacter);

    return handleSelect(id - 1);
  };

  return (
    <Container
      m={0}
      p={0}
      maxWidth={{
        sm: "sm",
        md: "sm",
        lg: "xl",
      }}
    >
      <Stack spacing={2.5}>
        <Box overflowX="scroll" maxWidth="100%">
          <Flex>
            {characters.map((character) => (
              <Box mx={1}>
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
