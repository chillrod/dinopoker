import { Input as Inp } from "@chakra-ui/react";

interface IInputProps {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  size?: string;
  value?: string;
}

export const Input = ({
  placeholder = "placeholder",
  disabled,
  required,
  invalid,
  size = "md",
  value,
}: IInputProps) => {
  return (
    <Inp
      bg="dino.secondary"
      color="dino.text"
      role="@dino-input"
      placeholder={placeholder}
      isDisabled={disabled}
      required={required}
      isInvalid={invalid}
      size={size}
      value={value}
    />
  );
};
