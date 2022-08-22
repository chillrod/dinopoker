import { Avatar, AvatarBadge, Flex, Tag } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

import { CharacterList } from "../../../config/characters";
import { IPlayerData } from "../../../model/PlayerData";
import { RoomDataStatus } from "../../../model/RoomData";

interface ICharacterCardProps {
  character: IPlayerData;
  status?: RoomDataStatus;
}

export const PokerCharacter = ({
  character,
  status,
}: ICharacterCardProps) => {
  const { t } = useTranslation("common");

  const parseSecretVoteBasedOnRoomStatus = (status?: RoomDataStatus, vote?: number) => {
    if (!status) return '-';

    const states: { [key in RoomDataStatus]: string | number | undefined } = {
      1: "-",
      2: "-",
      3: vote,
    };

    return states[status]

    // if (status === "REVEALED" && !isRevealed) return "-";

    // return states[status];
  };


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

    if (character.vote) return "dino.primary";

    return "none";
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
          src={`/${CharacterList[character?.character || 0].src}`}
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
              <>{parseSecretVoteBasedOnRoomStatus(status, character.vote)}</>
            ) : (
              "-"
            )}
          </AvatarBadge>
        </Avatar>
      </Flex>
    </>
  );
};
