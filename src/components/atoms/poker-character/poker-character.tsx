import {
  Badge,
  Box,
  Button,
  Flex,
  Img,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";

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
  const parseCharacterTeam = (team: number) => {
    const arrayState = ["-", "(frontend)", "(backend)", "(sem time)"];

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
          fontSize="md"
          color={character?.team ? parseCharacterTeamColor(character.team) : ""}
        >
          {character.raiseHand ? `${character.name} 🤚` : character.name}{" "}
          {character?.team ? parseCharacterTeam(character.team) : "-"}
        </Tag>
        <Tooltip label={character.vote ? "Voted... hmmm" : "Not voted"}>
          <Button
            bg={character.vote ? "dino.primary" : ""}
            borderColor={character.raiseHand ? "yellow.500" : ""}
            borderWidth="2px"
            as="div"
            borderRadius="full"
            outline="none"
            role="@dino-charactervote"
            size="xs"
            p={2}
            w={["4.5em", "5.5em"]}
            h={["4.5em", "5.5em"]}
          >
            <Flex w="100%" direction="column" alignItems="center">
              <Img
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
          <Tag colorScheme="purple" fontSize="xl">
            Vote: {handleVoteFunction(status, character.vote)}
          </Tag>
        ) : (
          <Tag colorScheme="purple" fontSize="xl">
            Vote: -
          </Tag>
        )}
      </Flex>
    </>
  );
};
