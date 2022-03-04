import { RepeatIcon } from "@chakra-ui/icons";
import { emitter } from "../../../service/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRestart = () => {
  const restartRoom = () => {
    emitter.emit("RESTART_ACTION", "RESTART");
  };

  return (
    <IconButton
      onClick={() => restartRoom()}
      color="dino.base1"
      ariaLabel="Restart Room"
      icon={<RepeatIcon />}
    />
  );
};
