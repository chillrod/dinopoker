import { CheckIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Button } from "../../atoms/button/button";
import { InputIcon } from "../input-icon/input-icon";

export const RoomStart = ({}) => {
  const action = {
    type: "confirm",
    fn: () => console.log("CREATE_ROOM"),
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
