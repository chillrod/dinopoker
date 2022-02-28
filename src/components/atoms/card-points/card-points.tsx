import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";

export const CardPoints = () => {
  return (
    <Button
      _hover={{
        transform: "translateY(-2%)",
        backgroundColor: "dino.primary",
      }}
      size="sm"
      bg="dino.secondary"
      minW="5em"
      maxH="9em"
      width={{
        sm: "5em",
        md: "5em",
        lg: "7em",
      }}
      height={{
        sm: "7em",
        md: "7em",
        lg: "9em",
      }}
    >
      <Grid>
        <GridItem justifySelf="start">
          <Box>
            <Text as="span">0.5</Text>
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
              0.5
            </Text>
          </Box>
        </GridItem>
        <GridItem justifySelf="end">
          <Box
            sx={{
              transform: "rotate(-180deg)",
            }}
          >
            <Text as="span">0.5</Text>
          </Box>
        </GridItem>
      </Grid>
    </Button>
  );
};
