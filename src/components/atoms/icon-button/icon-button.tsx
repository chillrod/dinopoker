import { IconButton as Btn } from "@chakra-ui/react";

interface IButtonProps {
  action?: {
    type: string;
    fn: () => void;
  };
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement;
  ariaLabel: string;
  onClick?: React.MouseEventHandler;
}

export const IconButton = ({
  action,
  disabled,
  loading,
  icon,
  ariaLabel,
  onClick,
}: IButtonProps) => {
  return (
    <Btn
      aria-label={ariaLabel}
      icon={icon}
      bg="none"
      fontSize="42px"
      color="dino.primary"
      isDisabled={disabled}
      role="@dino-iconbutton"
      onClick={onClick}
      isLoading={loading}
    ></Btn>
  );
};
