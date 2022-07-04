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
      _hover={{
        transform: "translateY(-2%)",
        backgroundColor: "dino.primary",
      }}
      size="sm"
      bg={selected ? "dino.primary" : "gray.700"}
      width={["auto", "6em"]}
      height={["auto", "8em"]}
      p={2}
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
            bg="gray.400"
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
