import { Box } from "@chakra-ui/react";
import { HomeView } from "../view/home";

export const App: React.FC = () => {
  return (
    <Box bg="black" minHeight="100vh">
      <HomeView />
    </Box>
  );
};
