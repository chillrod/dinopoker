import { Box, Center, Container } from "@chakra-ui/react";
import { Home } from "../organisms/home";

export const App = () => {
  return (
    <Box minHeight="100vh" bg="dino.base4">
      <Home />
    </Box>
  );
};
