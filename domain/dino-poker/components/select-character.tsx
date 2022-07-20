import { useEffect, useState } from "react";

import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "react-feather";

import useTranslation from "next-translate/useTranslation";
import { CharacterList } from "../interface/characters";
import { PlayerService } from "../services/player/player.service";
import { CharacterCard } from "./character-card";
import { IconButton } from "../../../components/atoms/icon-button/icon-button";

export const SelectCharacter = ({ character }: { character?: number }) => {
  const { t } = useTranslation("common");

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
    <Grid
      gridTemplateAreas={`
    "arrow-left characters arrow-right"
    `}
      gridTemplateColumns="auto auto"
      gridTemplateRows="1fr"
      alignItems="center"
      justifyContent="center"
    >
      <GridItem area="characters">
        <Flex
          wrap={["wrap", "wrap", "nowrap"]}
          justifyContent="center"
          overflow="auto"
        >
          {CharacterList.map((character) => (
            <Box key={character.id} p={3}>
              <CharacterCard
                onClick={() => handleSelected(character.id)}
                characterId={character.id}
                isSelected={selected}
              />
            </Box>
          ))}
        </Flex>
      </GridItem>
      <GridItem area="arrow-left">
        <IconButton
          onClick={() => handleArrowBack(selected)}
          ariaLabel={t("components.previous")}
          icon={<ChevronLeft />}
        ></IconButton>
      </GridItem>
      <GridItem area="arrow-right">
        <IconButton
          onClick={() => handleSelectNext(selected)}
          ariaLabel={t("components.next")}
          icon={<ChevronRight />}
        ></IconButton>
      </GridItem>
    </Grid>
  );
};
