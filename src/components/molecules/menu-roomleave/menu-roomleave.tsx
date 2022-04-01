import { SmallCloseIcon } from "@chakra-ui/icons";
import { emitter } from "../../../service/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";

import { useTranslation } from "react-i18next";

export const MenuRoomLeave = () => {
  const { t } = useTranslation();

  const handleLeaveRoom = () => [
    emitter.emit("EMIT_MESSAGEBOX", {
      message: t("round.leave-action"),
      func: "LEAVE_ACTION",
    }),
  ];

  return (
    <IconButton
      onClick={() => handleLeaveRoom()}
      color="dino.base1"
      ariaLabel={t("round.leave-action")}
      icon={<SmallCloseIcon />}
    />
  );
};
