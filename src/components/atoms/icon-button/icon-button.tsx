import { IconButton as Btn } from "@chakra-ui/react";

interface IButtonProps {
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement;
  ariaLabel: string;
  bg?: string;
  color?: string;
  onClick?: React.MouseEventHandler;
}

export const IconButton = ({
  disabled,
  loading,
  icon,
  color = "dino.primary",
  bg = "none",
  ariaLabel,
  onClick,
}: IButtonProps) => {
  return (
    <Btn
      aria-label={ariaLabel}
      icon={icon}
      bg={bg}
      fontSize="22px"
      color={color}
      isDisabled={disabled}
      role="@dino-iconbutton"
      onClick={onClick}
      isLoading={loading}
    ></Btn>
  );
};
