import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { emitter } from "../../../service/emitter";
import { IOption, Select } from "../../atoms/select/select";

export const RoomConfig = () => {
  // todo - change to api
  const selectOptions: IOption[] = [
    {
      id: 0,
      text: "Modified Fibonacci (0.5, 2, 30...)",
      value: [0, 0.5, 1, 2, 3, 5, 8, 13, 21],
    },
    {
      id: 1,
      text: "Fibonacci (0.5, 2, 30...)",
      value: [0, 0.5, 1, 2, 3, 5, 8, 13, 21],
    },
  ];

  const handleSetSelected = (e: any) => {
    const findOption = selectOptions.find(
      (option) => option.id === e.target.value
    );

    emitter.emit("SELECTED_CONFIGURATION", findOption);

    return e.target.value;
  };

  return (
    <Box width="100%" role="@dino-roomconfig">
      <FormControl>
        <FormLabel>Room configuration</FormLabel>
        <Select
          selected={0}
          options={selectOptions}
          onChange={(e) => handleSetSelected(e)}
        />
      </FormControl>
    </Box>
  );
};
