import { useMemo, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

import { Box, FormControl, FormLabel, SimpleGrid } from "@chakra-ui/react";
import { emitter } from "../../../service/emitter";
import { Button } from "../../atoms/button/button";
import { InputIcon } from "../input-icon/input-icon";
import { IOption } from "../../atoms/select/select";
import { character } from "../../atoms/character-card/hooks";
import { characters } from "../../../organisms/home/characters";
import { pointSystem } from "../room-config/pointSystem";

interface RoomConfiguration {
  character?: character;
  pointSystem?: IOption;
  name?: string;
}

export const RoomStart = () => {
  const [canCreateRoom, setCanCreateRoom] = useState(false);
  const [roomConfiguration, setRoomConfiguration] = useState<RoomConfiguration>(
    {
      character: undefined,
      pointSystem: undefined,
      name: "",
    }
  );

  const handleCreateRoom = () => {
    emitter.emit("CREATE_ROOM", {
      character: roomConfiguration.character || characters[0],
      pointSystem: roomConfiguration.pointSystem?.value || pointSystem[0].value,
      name: roomConfiguration.name,
    });

    return roomConfiguration;
  };

  useMemo(() => {
    emitter.on("CHARACTER_NAME", (name) => {
      if (name.length) {
        setRoomConfiguration({
          ...roomConfiguration,
          name,
        });

        return setCanCreateRoom(true);
      }

      return setCanCreateRoom(false);
    });

    emitter.on("SELECTED_CONFIGURATION", (data) => {
      setRoomConfiguration({
        ...roomConfiguration,
        pointSystem: data,
      });
    });

    emitter.on("SELECTED_CHARACTER", (data) => {
      setRoomConfiguration({
        ...roomConfiguration,
        character: data,
      });
    });
  }, [roomConfiguration]);

  return (
    <Box role="@dino-roomstart">
      <SimpleGrid columns={2} spacing={3} p={0} m={0}>
        <FormControl>
          <FormLabel>Or join a room</FormLabel>
          <InputIcon ariaLabel="Confirm" icon={<CheckIcon />} />
        </FormControl>
        <Box alignSelf="end" justifySelf="end">
          <Button
            disabled={!canCreateRoom}
            onClick={() => handleCreateRoom()}
            action="confirm"
          >
            Create a room
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
