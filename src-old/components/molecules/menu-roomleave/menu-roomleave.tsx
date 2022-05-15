import { emitter } from "../../../service/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";

import { useTranslation } from "react-i18next";
import { XCircle } from "react-feather";
import { NotificationsService } from "../../../service/notifications/notifications.service";

export const MenuRoomLeave = () => {
  const { t } = useTranslation();

  const handleLeaveRoom = () => [
    NotificationsService.emitMessageBox({
      message: t("round.leave-action"),
      func: "LEAVE_ACTION",
    }),
  ];

  return (
    <IconButton
      onClick={() => handleLeaveRoom()}
      color="dino.base1"
      ariaLabel={t("round.leave-action")}
      icon={<XCircle />}
    />
  );
};
