import { RepeatIcon } from "@chakra-ui/icons";
import { emitter } from "../../../service/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";

import { useTranslation } from "react-i18next";

export const MenuRestart = () => {
  const { t } = useTranslation();
  const handleRestartRoom = () => [
    emitter.emit("EMIT_MESSAGEBOX", {
      message: t("round.restart-action"),
      func: "RESTART_ACTION",
    }),
  ];

  return (
    <IconButton
      onClick={() => handleRestartRoom()}
      color="dino.base1"
      ariaLabel={t("round.restart-action")}
      icon={<RepeatIcon />}
    />
  );
};
