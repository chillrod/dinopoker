import { useState } from "react";

import { chakra, Select as Sl } from "@chakra-ui/react";

export type IOption = {
  action: () => void;
  text: string;
  value: string;
};

interface ISelect {
  options: IOption[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  selected?: string;
}

const Option = chakra("option", {});

export const Select = ({ options, onChange, disabled, selected }: ISelect) => {
  return (
    <Sl
      role="@dino-select"
      defaultValue={selected?.length && selected}
      onChange={onChange}
      bg="dino.secondary"
      color="dino.text"
      border="none"
      isDisabled={disabled}
    >
      {options.map((option) => (
        <Option
          role="@dino-selectoption"
          key={option.text}
          value={option.value}
        >
          {option.text}
        </Option>
      ))}
    </Sl>
  );
};
