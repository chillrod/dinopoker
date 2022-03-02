import { NumberInput as Inp, NumberInputField } from "@chakra-ui/react";

interface IInputProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string | number;
  onChange?: (valueAsNumber: string) => void;
}

export const InputNumber = ({
  placeholder = "3",
  disabled,
  value,
  onChange,
}: IInputProps) => {
  return (
    <Inp max={6} min={3} defaultValue={value} onChange={onChange}>
      <NumberInputField
        border="none"
        bg="dino.secondary"
        color="dino.text"
        role="@dino-inputnumber"
        placeholder={placeholder}
        width="100%"
        disabled={disabled}
      />
    </Inp>
  );
};
