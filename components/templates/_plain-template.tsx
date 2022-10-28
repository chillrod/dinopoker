import { Container, Grid } from "@chakra-ui/react";

export const PlainTemplate = ({
  cols,
  rows,
  children,
  areas,
  align,
  justify,
}: {
  children: React.ReactElement[] | React.ReactElement;
  cols?: string[];
  rows?: string[];
  areas?: string[];
  align?: string;
  justify?: string;
}) => {
  return (
    <Container maxW="container.xl">
      <Grid
        alignItems={align}
        justifyItems={justify}
        bg="dino.base5"
        minH="100vh"
        p={6}
        gridTemplateRows={rows}
        gridTemplateColumns={cols}
        gridTemplateAreas={areas}
      >
        {children}
      </Grid>
    </Container>
  );
};
