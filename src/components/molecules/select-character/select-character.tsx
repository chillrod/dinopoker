import { useEffect, useState } from "react";

import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "react-feather";

import { CharacterList } from "../../../config/characters";
import { CharacterCard } from "../../atoms/character-card/character-card";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { useTranslation } from "react-i18next";
import { PlayerService } from "../../../services/player/player.service";

export const SelectCharacter = ({ character }: { character?: number }) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(character || 0);

  const handleSelected = (id: number): number => {
    setSelected(id);

    PlayerService.PLAYER_CHARACTER(id);

    return selected;
  };

  const handleSelectNext = (id: number) => {
    const lastCharacter = CharacterList.length - 1;

    if (id === lastCharacter) return handleSelected(0);

    return handleSelected(id + 1);
  };

  const handleArrowBack = (id: number) => {
    const lastCharacter = CharacterList.length - 1;

    if (id === 0) return handleSelected(lastCharacter);

    return handleSelected(id - 1);
  };

  useEffect(() => {
    setSelected(character || 0);
  }, [character]);

  return (
    <Box>
      <Grid
        gap={3}
        templateRows="1fr"
        templateColumns="5% auto 5%"
        alignItems="center"
      >
        <GridItem gridColumn={2}>
          <Box overflowX="scroll" maxW="100%">
            <Flex px={5} maxW={[300, 350, 450, 700]}>
              {CharacterList.map((character) => (
                <Box key={character.id} m={2}>
                  <CharacterCard
                    onClick={() => handleSelected(character.id)}
                    characterId={character.id}
                    isSelected={selected}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        </GridItem>
        <GridItem gridColumn={1} gridRow={1}>
          <IconButton
            onClick={() => handleArrowBack(selected)}
            ariaLabel={t("components.previous")}
            icon={<ChevronLeft />}
          ></IconButton>
        </GridItem>
        <GridItem gridColumn={3} gridRow={1}>
          <IconButton
            onClick={() => handleSelectNext(selected)}
            ariaLabel={t("components.next")}
            icon={<ChevronRight />}
          ></IconButton>
        </GridItem>
      </Grid>
    </Box>
  );
};
