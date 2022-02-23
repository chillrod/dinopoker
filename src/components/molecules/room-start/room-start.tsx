import { useEffect, useMemo, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

import { Box, FormControl, FormLabel, SimpleGrid } from "@chakra-ui/react";
import { emitter } from "../../../service/emitter";
import { Button } from "../../atoms/button/button";
import { InputIcon } from "../input-icon/input-icon";

export const RoomStart = () => {
  const [canCreateRoom, setCanCreateRoom] = useState(false);
  const handleCreateRoom = () => {};

  useEffect(() => {
    emitter.on("CHARACTER_NAME", (name) => {
      if (name.length) {
        return setCanCreateRoom(true);
      }

      return setCanCreateRoom(false);
    });
  }, []);

  return (
    <Box role="@dino-roomstart">
      <SimpleGrid columns={2} spacing={3} p={0} m={0}>
        <FormControl>
          <FormLabel>Or create a room</FormLabel>
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
