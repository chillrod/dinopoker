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
  return (
    <>
      <Flex direction="column" alignItems="center" gap={1}>
        <Text fontSize="xl">
          {character.raiseHand ? `${character.name} 🤚` : character.name}
        </Text>
        <Tooltip label={character.vote ? "Voted... hmmm" : "Not voted"}>
          <Button
            borderColor={character.raiseHand ? "yellow.500" : ""}
            // bg={character?.vote > 0 ? "dino.primary" : ""}
            borderWidth="2px"
            as="div"
            borderRadius="full"
            outline="none"
            role="@dino-charactervote"
            size="xs"
            p={2}
            width={{
              sm: "5em",
              md: "5em",
              lg: "5em",
            }}
            height={{
              sm: "5em",
              md: "5em",
              lg: "5em",
            }}
          >
            <Flex w="100%" direction="column" alignItems="center">
              <Box w="100%" h="100%">
                <Img
                  role="@dino-characterimg"
                  src={CharacterList[character?.character || 0].src}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
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
