import { Button as Btn } from "@chakra-ui/react";

interface IButtonProps {
  children?: React.ReactNode;
  bg?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  forwardRef?: any;
}

export const Button = ({
  children,
  disabled,
  loading,
  onClick,
  forwardRef,
  bg = "",
}: IButtonProps) => {
  return (
    <Btn
      ref={forwardRef}
      isDisabled={disabled}
      role="@dino-button"
      bg={!bg.length ? "dino.primary" : bg}
      onClick={onClick}
      isLoading={loading}
    >
      {children}
    </Btn>
  );
};
