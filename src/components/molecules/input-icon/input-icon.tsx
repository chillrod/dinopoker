import { CheckIcon } from "@chakra-ui/icons";
import { InputGroup } from "@chakra-ui/react";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { Input } from "../../atoms/input/input";

interface IInputIconProps {
  action?: {
    type: string;
    fn: () => void;
  };
  placeholder?: string;
  required?: boolean;
  size?: string;
  value?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement;
}

function JoinRoom() {
  alert("Join Room");
}

export const InputIcon = ({
  placeholder = "placeholder",
  required,
  size = "md",
  value,
}: IInputIconProps) => {
  return (
    <>
      <InputGroup maxW="sm" size="sm">
        <Input
          placeholder={placeholder}
          required={required}
          size={size}
          value={value}
        />
        <IconButton
          disabled={!!value}
          bg="purple.500"
          color="rgb(153, 153, 153)"
          icon={<CheckIcon />}
          ariaLabel="Join a room"
          onClick={() => JoinRoom()}
        ></IconButton>
      </InputGroup>
    </>
  );
};
