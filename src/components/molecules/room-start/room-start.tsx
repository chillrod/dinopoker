import { useMemo, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

import { Box, FormControl, FormLabel, SimpleGrid } from "@chakra-ui/react";
import { Button } from "../../atoms/button/button";
import { InputIcon } from "../../atoms/input-icon/input-icon";
import { IOption } from "../../atoms/select/select";
import { character } from "../../atoms/character-card/hooks";
import { characters } from "../../../organisms/home/characters";
import { pointSystem } from "../room-config/pointSystem";

import { emitter } from "../../../service/emitter/emitter";

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
    const updatedOrDefaultCharacter =
      roomConfiguration.character || characters[0];

    const updatedOrDefaultPointSystem =
      roomConfiguration?.pointSystem?.value || pointSystem[0].value;

    emitter.emit("CREATE_ROOM", {
      character: updatedOrDefaultCharacter,
      pointSystem: updatedOrDefaultPointSystem,
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
      <SimpleGrid columns={2} gap={6} p={0} m={0}>
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
