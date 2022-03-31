import { LinkIcon } from "@chakra-ui/icons";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuShare = () => {
  return (
    <IconButton
      disabled
      color="dino.base1"
      ariaLabel="Share Room"
      icon={<LinkIcon />}
    />
  );
};
