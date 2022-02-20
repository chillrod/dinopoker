import React, { useEffect, useState } from "react";

import { CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, InputGroup } from "@chakra-ui/react";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { Input } from "../../atoms/input/input";

interface IInputIconProps {
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  confirm?: (e: any) => void;
  value?: string;
  ariaLabel: string;
}

export const InputIcon = ({
  placeholder,
  disabled,
  loading,
  confirm,
  value,
  ariaLabel,
}: IInputIconProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleConfirm = (e: any) => {
    if (confirm) {
      return confirm(e);
    }
  };

  useEffect(() => {
    if (value?.length) setInputValue(value);
  }, []);

  return (
    <>
      <Flex>
        <Input
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading || disabled}
          value={inputValue}
        />
        <IconButton
          onClick={() => handleConfirm(inputValue)}
          disabled={!inputValue?.length || disabled}
          loading={loading}
          bg="dino.primary"
          color="dino.text"
          icon={<CheckIcon />}
          ariaLabel={ariaLabel}
        ></IconButton>
      </Flex>
    </>
  );
};
