import { Heading, Tag, Text } from "@chakra-ui/react";

export const DinoPoker = () => {
  return (
    <>
      <Heading textAlign="center" size="md">
        dino {""}
        <Text as="span" color="dino.primary">
          planningpoker
        </Text>
        <Tag mx={1} colorScheme="green">beta</Tag>
      </Heading>
    </>
  );
};
