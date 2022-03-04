import { useMemo, useState } from "react";

import { CheckIcon } from "@chakra-ui/icons";

import {
  Box,
  FormControl,
  FormLabel,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";

import { Button } from "../../atoms/button/button";
import { InputIcon } from "../../atoms/input-icon/input-icon";

import { emitter } from "../../../service/emitter/emitter";

interface IRoomStart {
  joinRoom?: (room: string) => void;
}

export const RoomStart = ({ joinRoom }: IRoomStart) => {
  const [canHandleRoom, setCanHandleRoom] = useState(false);

  useMemo(() => {
    emitter.on("CHARACTER_NAME", (name) => {
      if (name.length) {
        return setCanHandleRoom(true);
      }

      return setCanHandleRoom(false);
    });
  }, []);

  return (
    <Box role="@dino-roomstart">
      <SimpleGrid columns={2} gap={6} p={0} m={0}>
        <FormControl>
          <FormLabel>Or join a room</FormLabel>
          <InputIcon
            disabled={!canHandleRoom}
            confirm={(e) => (joinRoom ? joinRoom(e) : null)}
            ariaLabel="Confirm"
            icon={<CheckIcon />}
          />
        </FormControl>
        <Box gridColumn={2} alignSelf="end" justifySelf="end">
          <Tooltip label="New rooms are disabled in beta">
            <span>
              <Button
                disabled={process.env.NODE_ENV !== "test" || !canHandleRoom}
                onClick={() => null}
                action="confirm"
              >
                Create a room
              </Button>
            </span>
          </Tooltip>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
