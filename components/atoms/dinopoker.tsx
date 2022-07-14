import { Flex, Grid, GridItem, Heading, Tag, Text } from "@chakra-ui/react";

import dino from "../../dino.json";

interface IDinoPoker {
  justify?: string;
  small?: boolean;
}

export const DinoPoker = ({ justify = "center", small }: IDinoPoker) => {
  return (
    <Grid alignItems="center" gap={2} justifyContent={justify}>
      <GridItem>
        <Heading
          as={!small ? "h1" : "h2"}
          fontWeight={600}
          textAlign="center"
          size={small ? "md" : "lg"}
        >
          dino
          <Text fontWeight={300} as="span" color="dino.primary">
            planning.app
          </Text>
        </Heading>
      </GridItem>

      <GridItem>
        <Tag fontWeight={600} as="p" colorScheme="purple">
          planning poker
        </Tag>
      </GridItem>
    </Grid>
  );
};
