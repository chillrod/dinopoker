import { MutableRefObject, useEffect, useRef, useState } from "react";

import { Box, Flex, Stack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { BaseBox } from "../../atoms/base-box/base-box";
import { CharacterCard } from "../../atoms/character-card/character-card";
import { character } from "../../atoms/character-card/hooks";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { emitter } from "../../../service/emitter";

interface ICharacterWrapper {
  characters: character[];
}

export const CharacterWrapper = ({ characters }: ICharacterWrapper) => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (id: number) => {
    const selected = characters.find((item) => item.id === id);

    emitter.emit("SELECTED_CHARACTER", selected);

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
    <>
      <Stack spacing={2.5}>
        <Box overflowX="scroll" maxWidth="100%">
          <Flex>
            {characters.map((character) => (
              <Box mx={1} key={character.id}>
                <CharacterCard
                  isSelected={selected}
                  onClick={() => handleCharacter(character)}
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
    </>
  );
};
