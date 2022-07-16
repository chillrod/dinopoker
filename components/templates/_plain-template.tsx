import { Grid } from "@chakra-ui/react";

export const PlainTemplate = ({
  cols,
  rows,
  children,
  areas,
}: {
  children: React.ReactElement[] | React.ReactElement;
  cols?: string;
  rows?: string;
  areas?: string;
}) => {
  const containerTemplate = {
    sm: `
      "hero hero"
      "dino dino"
      `,
    md: `
      "hero hero"
      "dino dino"
      `,
    lg: `
      "dino hero"
      "dino hero"
      `,
  };

  return (
    <Grid
      bg="dino.base5"
      borderRadius="2xl"
      h='calc(100vh)'
      p={8}
      gap={6}
      gridTemplateRows={rows || ""}
      gridTemplateColumns={cols || ["1fr", "1fr", "1fr", "1fr 1fr"]}
      gridTemplateAreas={areas || containerTemplate}
    >
      {children}
    </Grid>
  );
};
