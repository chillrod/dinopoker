import { Button as Btn } from "@chakra-ui/react";

interface IButtonProps {
  children?: React.ReactNode;
  bg?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  forwardRef?: any;
  size?: string;
}

export const Button = ({
  children,
  disabled,
  loading,
  onClick,
  forwardRef,
  bg = "",
  size,
}: IButtonProps) => {
  return (
    <Btn
      ref={forwardRef}
      size={size}
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
