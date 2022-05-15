import { Box, Grid, GridItem } from "@chakra-ui/react";

import { Home } from "../components/organisms/home";
import { Menu } from "../components/organisms/menu/menu";

export const App = () => {
  return (
    <Grid placeItems="center" p={3}>
      <Box>
        <Menu />
      </Box>
      <Box
        p={{
          md: 8,
          sm: 2,
          xl: 12,
        }}
      >
        <Home />
      </Box>
    </Grid>
  );
};
