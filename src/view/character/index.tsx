import { Box, Center } from "@chakra-ui/react";
import { Model } from "./components/model";
import { Welcome } from "./components/welcome";

export const CharacterModule: React.FC = () => {
  return (
    <Box>
      <Center>
        <Welcome />
      </Center>
      <Center>
        <Model />
      </Center>
    </Box>
  );
};
