import { Flex, Heading, Tag, Text } from "@chakra-ui/react";
import dino from "../../dino.json";

interface IDinoPoker {
  justify?: string;
  small?: boolean;
}

export const DinoPoker = ({ justify = "center", small }: IDinoPoker) => {
  return (
    <Flex gap={3} justifyContent={justify} alignItems="center">
      <Heading
        as={!small ? "h1" : "h2"}
        fontWeight={600}
        textAlign="center"
        size={small ? "md" : "lg"}
      >
        dino
        <Text fontWeight={300} as="span" color="dino.primary">
          poker.app
        </Text>
      </Heading>
      <Tag colorScheme="purple">beta {dino.version}</Tag>
    </Flex>
  );
};
