import { Flex, Heading, Tag, Text } from "@chakra-ui/react";

interface IDinoPoker {
  justify?: string;
  small?: boolean;
}

export const DinoPoker = ({ justify = "center", small }: IDinoPoker) => {
  return (
    <Flex justifyContent={justify} alignItems="center">
      <Heading p={1} textAlign="center" size={small ? "md" : "lg"}>
        dino
        <Text as="span" color="dino.primary">
          poker.app
        </Text>
      </Heading>
      <Tag mx={1} colorScheme="purple">
        beta 2.5.0
      </Tag>
    </Flex>
  );
};
