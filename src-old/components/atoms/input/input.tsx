import { Input as Inp } from "@chakra-ui/react";

interface IInputProps {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  size?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
}

export const Input = ({
  placeholder = "placeholder",
  disabled,
  required,
  invalid,
  size = "md",
  onChange,
  value,
}: IInputProps) => {
  return (
    <Inp
      border="none"
      bg="dino.secondary"
      color="dino.text"
      role="@dino-input"
      placeholder={placeholder}
      isDisabled={disabled}
      required={required}
      isInvalid={invalid}
      width="100%"
      size={size}
      defaultValue={value}
      onChange={onChange}
    />
  );
};
