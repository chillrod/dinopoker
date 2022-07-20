import { Share } from "react-feather";
import { IconButton } from "../../../components/atoms/icon-button/icon-button";

export const MenuShare = () => {
  return (
    <IconButton color="dino.base1" ariaLabel="Share Room" icon={<Share />} />
  );
};
