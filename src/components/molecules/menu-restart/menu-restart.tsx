import { emitter } from "../../../service/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";

import { useTranslation } from "react-i18next";
import { Repeat } from "react-feather";
import { NotificationsService } from "../../../service/notifications/notifications.service";

export const MenuRestart = () => {
  const { t } = useTranslation();
  const handleRestartRoom = () => [
    NotificationsService.emitMessageBox({
      message: t("round.restart-action"),
      func: "RESTART_ACTION",
    }),
  ];

  return (
    <IconButton
      onClick={() => handleRestartRoom()}
      color="dino.base1"
      ariaLabel={t("round.restart-action")}
      icon={<Repeat />}
    />
  );
};
