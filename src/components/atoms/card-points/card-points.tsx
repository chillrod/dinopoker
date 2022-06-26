import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";

interface ICardPoints {
  point: number;
  selected: boolean;
  onClick?: (point: number) => void;
}
export const CardPoints = ({ selected, point, onClick }: ICardPoints) => {
  return (
    <Button
      role="@dino-cardpoint"
      onClick={() => onClick && onClick(point)}
      _hover={{
        transform: "translateY(-2%)",
        backgroundColor: "dino.primary",
      }}
      size="sm"
      bg={selected ? "dino.primary" : "dino.secondary"}
      width="6em"
      height="8em"
    >
      <Grid gap={2}>
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
            width="6ch"
            h="6ch"
            borderRadius="full"
          >
            <Text
              fontSize="3xl"
              color="dino.secondary"
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
