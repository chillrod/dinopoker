import { RepeatIcon } from "@chakra-ui/icons";
import { emitter } from "../../../service/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRestart = () => {
  const handleRestartRoom = () => [
    emitter.emit("EMIT_MESSAGEBOX", {
      message: "Restart the room",
      func: "RESTART_ACTION",
    }),
  ];

  return (
    <IconButton
      onClick={() => handleRestartRoom()}
      color="dino.base1"
      ariaLabel="Restart Room"
      icon={<RepeatIcon />}
    />
  );
};
