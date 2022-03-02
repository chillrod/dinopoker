import { RepeatIcon } from "@chakra-ui/icons";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRestart = () => {
  return (
    <IconButton
      color="dino.base1"
      ariaLabel="Restart Room"
      icon={<RepeatIcon />}
    />
  );
};
