import { Button, Flex, Img, Tag, Tooltip } from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";

import { CharacterList } from "../../../config/characters";
import { IPlayerData } from "../../../model/PlayerData";

interface ICharacterCardProps {
  character: IPlayerData;
  handleVoteFunction: (status: string, vote: number) => string | number;
  status: string;
}

export const PokerCharacter = ({
  character,
  handleVoteFunction,
  status,
}: ICharacterCardProps) => {
  const { t } = useTranslation("common");

  const parseCharacterTeam = (team: number) => {
    const arrayState = [
      "-",
      t("poker.actions.team-one"),
      t("poker.actions.team-two"),
      t("poker.actions.no-team"),
    ];

    return arrayState[team];
  };

  const parseCharacterTeamColor = (team: number) => {
    const arrayState = ["", "yellow.400", "blue.300", ""];

    return arrayState[team];
  };
  return (
    <>
      <Flex direction="column" alignItems="center" gap={2}>
        <Tag
          fontSize="sm"
          color={character?.team ? parseCharacterTeamColor(character.team) : ""}
        >
          {character.raiseHand ? `${character.name} 🤚` : character.name}{" "}
          {character?.team ? `(${parseCharacterTeam(character.team)})` : "-"}
        </Tag>
        <Tooltip
          label={
            character.vote ? t("poker.poker.voted") : t("poker.poker.not-voted")
          }
        >
          <Button
            bg={character.vote ? "dino.primary" : ""}
            borderColor={character.raiseHand ? "yellow.500" : "dino.primary"}
            borderWidth="2px"
            as="section"
            borderRadius="full"
            outline="none"
            role="@dino-charactervote"
            size="xs"
            p={3}
            w={["4.5em", "5.5em"]}
            h={["4.5em", "5.5em"]}
          >
            <Flex w="100%" direction="column" alignItems="center">
              <Img
                alt={CharacterList[character?.character || 0].name}
                title={CharacterList[character?.character || 0].name}
                loading="eager"
                role="@dino-characterimg"
                src={CharacterList[character?.character || 0].src}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Flex>
          </Button>
        </Tooltip>
        {character.vote ? (
          <Tag fontSize="xl">
            {t("poker.poker.vote")}:{" "}
            {handleVoteFunction(status, character.vote)}
          </Tag>
        ) : (
          <Tag colorScheme="purple" fontSize="xl">
            {t("poker.poker.vote")}: -
          </Tag>
        )}
      </Flex>
    </>
  );
};
