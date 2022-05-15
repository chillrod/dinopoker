import { Flex, Heading, Tag, Text } from "@chakra-ui/react";

interface IDinoPoker {
  justify?: string;
}

export const DinoPoker = ({ justify = "center" }: IDinoPoker) => {
  return (
    <Flex justifyContent={justify} alignItems="center">
      <Heading p={1} textAlign="center" size="lg">
        dino
        <Text as="span" color="dino.primary">
          poker.app
        </Text>
      </Heading>
      <Tag mx={1} colorScheme="purple">
        beta 0.1.0
      </Tag>
    </Flex>
  );
};
