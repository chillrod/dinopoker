import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";

interface IDinoPoker {
  justify: string;
}

export const DinoPoker = ({ justify = "start" }: IDinoPoker) => {
  return (
    <Flex justifyContent={justify} alignItems="center">
      <Heading p={1} textAlign="center" size="md">
        dino
        <Text as="span" color="dino.primary">
          poker.app
        </Text>
        <Tag mx={1} colorScheme="purple">
          beta 0.1.0
        </Tag>
      </Heading>
    </Flex>
  );
};
