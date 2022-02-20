import { Button as Btn } from "@chakra-ui/react";

interface IButtonProps {
  children?: React.ReactNode;
  action?: {
    type: string;
    fn?: () => void;
  };
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export const Button = ({
  children,
  action,
  disabled,
  loading,
  onClick,
}: IButtonProps) => {
  return (
    <Btn
      isDisabled={disabled}
      role="@dino-button"
      bg={action?.type === "confirm" ? "dino.primary" : "dino.secondary"}
      onClick={onClick}
      isLoading={loading}
    >
      {children}
    </Btn>
  );
};
