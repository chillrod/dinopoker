import { Grid } from "@chakra-ui/react";

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
    <Grid
      alignItems={align}
      justifyItems={justify}
      bg="dino.base5"
      height="100%"
      borderRadius="2xl"
      gap={6}
      p={8}
      h='full'
      minH="100vh"
      gridTemplateRows={rows}
      gridTemplateColumns={cols}
      gridTemplateAreas={areas}
    >
      {children}
    </Grid>
  );
};
