import { useState } from "react";

import { Flex } from "@chakra-ui/react";
import { IconButton } from "../icon-button/icon-button";
import { Input } from "../input/input";

interface IInputIconProps {
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  confirm?: (e: any) => void;
  value?: string;
  ariaLabel: string;
  icon?: React.ReactElement;
}

export const InputIcon = ({
  placeholder,
  disabled,
  loading,
  confirm,
  value,
  ariaLabel,
  icon,
}: IInputIconProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleConfirm = (e: any) => {
    if (confirm) {
      return confirm(e);
    }
  };

  const handleChangeInputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Flex role="@dino-inputicon">
        <Input
          placeholder={placeholder}
          onChange={(e) => handleChangeInputValue(e)}
          disabled={loading || disabled}
          value={inputValue}
        />
        <IconButton
          onClick={() => handleConfirm(inputValue)}
          disabled={!inputValue?.length || disabled}
          loading={loading}
          bg="dino.primary"
          color="dino.text"
          icon={icon}
          ariaLabel={ariaLabel}
        ></IconButton>
      </Flex>
    </>
  );
};
