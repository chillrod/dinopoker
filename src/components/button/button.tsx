import { Button as Btn } from "@chakra-ui/react";
import { callAction } from "./hooks";

interface IButtonProps {
  children?: React.ReactNode;
  action?: {
    type: string;
    fn: () => void;
  };
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  action,
  disabled,
  loading,
}: IButtonProps) => {
  return (
    <Btn
      isDisabled={disabled}
      role="@dino-button"
      bg={action?.type === "confirm" ? "dino.primary" : "dino.secondary"}
      onClick={() => callAction({ action })}
      isLoading={loading}
    >
      {children}
    </Btn>
  );
};
