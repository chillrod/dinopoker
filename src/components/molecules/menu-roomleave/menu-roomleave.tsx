import { SmallCloseIcon } from "@chakra-ui/icons";
import { emitter } from "../../../service/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRoomLeave = () => {
  const handleLeaveRoom = () => [
    emitter.emit("EMIT_MESSAGEBOX", "Leave the room"),
  ];
  return (
    <IconButton
      onClick={() => handleLeaveRoom()}
      color="dino.base1"
      ariaLabel="Leave Room"
      icon={<SmallCloseIcon />}
    />
  );
};
