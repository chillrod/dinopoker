import { Box } from "@chakra-ui/react";
import { Button } from "../components/button/button";
import { HomeView } from "../view/home";

export const App: React.FC = () => {
  const payload = () => "hello";

  const action = {
    type: "confirm",
    fn: payload,
  };

  return (
    <Box bg="dino.base3" minHeight="100vh">
      <Button action={action} loading={true}>
        hey
      </Button>
    </Box>
  );
};
