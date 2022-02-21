import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { IOption, Select } from "../../atoms/select/select";
import { TitleSubtitle } from "../../atoms/title-subtitle";

interface IRoomConfig {
  selectedConfig: (config: IOption) => void;
}

export const RoomConfig = ({ selectedConfig }: IRoomConfig) => {
  const [selected, setSelected] = useState<IOption>();
  // todo - change to api
  const selectOptions: IOption[] = [
    {
      action: () => "SELECTED_FIBONACCI",
      text: "Modified Fibonacci (0.5, 2, 30",
      value: "fibonacci-modified",
    },
    {
      action: () => "SELECTED_FIBONACCINORMAL",
      text: " Fibonacci (0.5, 2, 30",
      value: "fibonacci",
    },
  ];

  const handleSetSelected = (e: any) => {
    const emitEvent = selectOptions.find(
      (item) => e.target.value === item.value
    ) || {
      action: () => console.log("NO_ACTION"),
      text: "",
      value: "",
    };

    selectedConfig(emitEvent);

    emitEvent?.action();

    setSelected(emitEvent);

    return selected;
  };

  return (
    <Box width="100%">
      <TitleSubtitle title="" subtitle="Room configuration" />
      <Select options={selectOptions} onChange={(e) => handleSetSelected(e)} />
    </Box>
  );
};
