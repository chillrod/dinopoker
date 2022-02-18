import {
  Box,
  Button,
  Stack,
  Grid,
  GridItem,
  Text,
  Flex,
} from "@chakra-ui/react";

import { Form } from "./form/form";
import { Player } from "./player/player";

export const Home: React.FC = () => {
  return (
    <Box bg="gray.800" p={5} borderRadius="lg">
      <Grid templateColumns="1fr 1fr" gap={6} templateRows="1fr">
        <GridItem gridColumn={1}>
          <Player />
        </GridItem>
        <GridItem gridColumn={2}>
          <Form />
        </GridItem>
      </Grid>
    </Box>
  );
};
