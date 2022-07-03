import { Flex, Heading, Tag, Text } from "@chakra-ui/react";

interface IDinoPoker {
  justify?: string;
  small?: boolean;
}

export const DinoPoker = ({ justify = "center", small }: IDinoPoker) => {
  return (
    <Flex justifyContent={justify} alignItems="center">
      <Heading
        fontWeight={600}
        p={1}
        textAlign="center"
        size={small ? "md" : "xl"}
      >
        dino
        <Text fontWeight={300} as="span" color="dino.primary">
          poker.app
        </Text>
      </Heading>
      <Tag colorScheme="purple">beta 3.0.0</Tag>
    </Flex>
  );
};
