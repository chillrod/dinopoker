import { CheckIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Button } from "../../atoms/button/button";
import { InputIcon } from "../input-icon/input-icon";

interface RoomStartProps {
  onCreateRoom: (x: string) => void;
}

export const RoomStart = ({ onCreateRoom }: RoomStartProps) => {
  const action = {
    type: "confirm",
    fn: () => {
      onCreateRoom("CREATE_ROOM");
      return "CREATE_ROOM";
    },
  };

  return (
    <Box>
      <SimpleGrid columns={2} spacing={4} p={0} m={0}>
        <InputIcon ariaLabel="Confirm" icon={<CheckIcon />} />
        <Button onClick={() => action.fn()} action={action}>
          Create a room
        </Button>
      </SimpleGrid>
    </Box>
  );
};
