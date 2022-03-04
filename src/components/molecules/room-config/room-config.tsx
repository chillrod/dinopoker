import { Box, FormControl, FormLabel, Tooltip } from "@chakra-ui/react";
import { emitter } from "../../../service/emitter/emitter";
import { Select } from "../../atoms/select/select";
import { pointSystem } from "./pointSystem";

export const RoomConfig = () => {
  const handleSetSelected = (e: any) => {
    const findOption = pointSystem.find(
      (option) => option.id === parseInt(e.target.value)
    );

    emitter.emit("SELECTED_CONFIGURATION", findOption);

    return e.target.value;
  };

  return (
    <Box width="100%" role="@dino-roomconfig">
      <FormControl>
        <FormLabel>Room configuration</FormLabel>
        <Tooltip label="Room configurations are disabled in beta">
          <span>
            <Select
              disabled={process.env.NODE_ENV !== "test"}
              selected={0}
              options={pointSystem}
              onChange={(e) => handleSetSelected(e)}
            />
          </span>
        </Tooltip>
      </FormControl>
    </Box>
  );
};
