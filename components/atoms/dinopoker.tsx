import { Grid, GridItem, Text } from "@chakra-ui/react";


interface IDinoPoker {
  justify?: string;
  small?: boolean;
}

export const DinoPoker = ({ justify = "center", small }: IDinoPoker) => {

  return (
    <Grid justifyItems="start" gap={2} justifyContent={justify}>
      <GridItem>
        <Text fontWeight={600} textAlign="center" fontSize={['sm', 'lg', 'xl', '2xl']}>
          {"dino"}
          <Text fontWeight={300} as="span" color="dino.primary">
            {"poker.app"}
          </Text>
        </Text>
      </GridItem>
    </Grid>
  );
};
