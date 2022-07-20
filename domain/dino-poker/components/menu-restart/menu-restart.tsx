import { RefreshCcw, Share } from "react-feather";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRestart = () => {
  return (
    <IconButton
      color="dino.base1"
      ariaLabel="Restart room"
      icon={<RefreshCcw />}
    />
  );
};
