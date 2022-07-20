import { Avatar, AvatarBadge, Flex, Tag } from "@chakra-ui/react";

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

  const parseCharacterColor = (character: IPlayerData) => {
    if (character.raiseHand) return "yellow.500";

    if (character.vote) return "purple.400";

    return "dino.base2";
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

        <Avatar
          loading="eager"
          src={CharacterList[character?.character || 0].src}
          size="lg"
          name={character.name ? character.name : "Unknown"}
          bg={parseCharacterColor(character)}
        >
          <AvatarBadge
            boxSize="1.5em"
            bg={character.vote ? "dino.primary" : "dino.base1"}
            color="dino.text"
          >
            {character?.vote ? (
              <>{handleVoteFunction(status, character.vote)}</>
            ) : (
              "-"
            )}
          </AvatarBadge>
        </Avatar>
      </Flex>
    </>
  );
};
