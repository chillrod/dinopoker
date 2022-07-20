import { Grid } from "@chakra-ui/react";

export const PlainTemplate = ({
  cols,
  rows,
  children,
  areas,
}: {
  children: React.ReactElement[] | React.ReactElement;
  cols?: string[];
  rows?: string[];
  areas?: string[];
}) => {
  return (
    <Grid
      bg="dino.base5"
      borderRadius="2xl"
      h="calc(100vh)"
      gap={4}
      p={8}
      gridTemplateRows={rows}
      gridTemplateColumns={cols}
      gridTemplateAreas={areas}
    >
      {children}
    </Grid>
  );
};
