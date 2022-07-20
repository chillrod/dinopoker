import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";

interface ICardPoints {
  point: number;
  selected: boolean;
  onClick?: (point: number) => void;
  disabled?: boolean;
}
export const CardPoints = ({
  selected,
  point,
  onClick,
  disabled,
}: ICardPoints) => {
  return (
    <Button
      disabled={disabled}
      role="@dino-cardpoint"
      onClick={() => onClick && onClick(point)}
      size="md"
      bg={selected ? "dino.primary" : "dino.base3"}
      width={["auto", "6em"]}
      height={["8em", "8em"]}
    >
      <Grid gap={2} p={4}>
        <GridItem justifySelf="start">
          <Box>
            <Text as="span">{point}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            sx={{
              display: "grid",
            }}
            bg="dino.base1"
            width="5ch"
            h="5ch"
            borderRadius="full"
          >
            <Text
              fontSize="3xl"
              color="dino.text"
              fontWeight={600}
              alignSelf="center"
            >
              {point}
            </Text>
          </Box>
        </GridItem>
        <GridItem justifySelf="end">
          <Box
            sx={{
              transform: "rotate(-180deg)",
            }}
          >
            <Text as="span">{point}</Text>
          </Box>
        </GridItem>
      </Grid>
    </Button>
  );
};
