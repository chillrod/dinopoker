import { Box, Button, Grid, GridItem, Input, Text } from "@chakra-ui/react";

export const Form: React.FC = () => {
  return (
    <Grid height="100%">
      <GridItem gridRow={1}>
        <Text my={1} fontSize="sm" fontWeight={700}>
          Name *
        </Text>
        <Input
          role="@dino-inputname"
          my={1}
          variant="filled"
          bg="gray.900"
          placeholder="type your name"
        />
        <Text my={1} fontSize="sm" fontWeight={700}>
          Join Room?
        </Text>
        <Input
          my={1}
          role="@dino-inputcode"
          variant="filled"
          bg="gray.900"
          placeholder="type room code"
        />
      </GridItem>
      <GridItem gridRow={2} alignSelf="end" justifySelf="end">
        <Text
          as="h2"
          fontSize="md"
          color="gray.100"
          fontWeight={700}
          textAlign="right"
          mb={3}
        >
          Or you can
        </Text>
        <Button colorScheme="gray">
          <Text textAlign="center" fontSize="md" fontWeight={700}>
            Create a Room
          </Text>
        </Button>
      </GridItem>
    </Grid>
  );
};
