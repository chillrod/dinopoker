import { Button as Btn } from "@chakra-ui/react";

interface IButtonProps {
  children?: React.ReactNode;
  action?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  ref?: any;
}

export const Button = ({
  children,
  action,
  disabled,
  loading,
  onClick,
  ref,
}: IButtonProps) => {
  return (
    <Btn
      ref={ref}
      isDisabled={disabled}
      role="@dino-button"
      bg={action === "confirm" ? "dino.primary" : "dino.secondary"}
      onClick={onClick}
      isLoading={loading}
    >
      {children}
    </Btn>
  );
};
