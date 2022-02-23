import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { character } from "../components/atoms/character-card/hooks";
import { IOption } from "../components/atoms/select/select";
import { Home } from "../organisms/home";
import { Round } from "../organisms/round";
import { emitter } from "../service/emitter";

type INewRoom = {
  character?: character;
  options?: IOption;
};

export const App = () => {
  const [newRoom, setNewRoom] = useState<INewRoom>();

  useEffect(() => {
    emitter.on("CREATE_ROOM", (event) => {
      setNewRoom(event);
    });
  }, []);

  return (
    <Box minHeight="100vh" bg="dino.base4">
      <Home />
      {newRoom?.character && (
        <Round character={newRoom?.character} pointSystem={newRoom?.options} />
      )}
    </Box>
  );
};
