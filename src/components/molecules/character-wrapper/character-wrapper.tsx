import { useState } from "react";

import { Box, Flex, Stack } from "@chakra-ui/react";

import { BaseBox } from "../../atoms/base-box/base-box";
import { CharacterCard } from "../../atoms/character-card/character-card";
import { character } from "../../atoms/character-card/hooks";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { emitter } from "../../../service/emitter/emitter";

import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "react-feather";
import { PlayerService } from "../../../service/player/player.service";
import { TitleSubtitle } from "../../atoms/title-subtitle";

interface ICharacterWrapper {
  characters: character[];
}

export const CharacterWrapper = ({ characters }: ICharacterWrapper) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(0);

  const handleSelect = (id: number) => {
    const selected = characters.find((item) => item.id === id);

    PlayerService.setSelectedCharacter(selected);

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
        <TitleSubtitle
          title={t("home.to-start")}
          subtitle={t("home.choose-color-mood")}
        />
        <Box overflowX="scroll" maxWidth="100%">
          <Flex gap={1.5}>
            {characters.map((character) => (
              <Box key={character.id}>
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
              ariaLabel={t("components.previous")}
              icon={<ChevronLeft />}
            />
            <IconButton
              onClick={() => handleArrowNext(selected)}
              ariaLabel={t("components.next")}
              icon={<ChevronRight />}
            />
          </Flex>
        </BaseBox>
      </Stack>
    </>
  );
};
