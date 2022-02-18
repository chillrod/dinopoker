import { Box, Button, Stack, Grid, GridItem, Text } from "@chakra-ui/react";

import { Form } from "./form/form";
import { Player } from "./player/player";

export const Home: React.FC = () => {
  return (
    <Box bg="purple.800" marginTop={2} borderRadius="lg">
      <Grid templateColumns="1fr 1fr" justifyContent="center" alignItems="center">
        <GridItem>
          <Player />
        </GridItem>
        <GridItem justifySelf="center" borderRadius="lg">
          <Stack spacing={5} p={3}>
            <Form />
            <Box>
              <Stack spacing={3}>
                <Text textAlign="center" fontSize="sm" fontWeight={700}>
                  Or you can
                </Text>
                <Button>
                  <Text textAlign="center" fontSize="md" fontWeight={700}>
                    Create a Room
                  </Text>
                </Button>
              </Stack>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};
