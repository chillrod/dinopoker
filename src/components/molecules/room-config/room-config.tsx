import { Box, FormControl, FormLabel, Tooltip } from "@chakra-ui/react";
import { emitter } from "../../../service/emitter/emitter";
import { Select } from "../../atoms/select/select";
import { pointSystem } from "./pointSystem";

import { useTranslation } from "react-i18next";

export const RoomConfig = () => {
  const { t } = useTranslation();

  const handleSetSelected = (e: any) => {
    const findOption = pointSystem.find(
      (option) => option.id === parseInt(e.target.value)
    );

    emitter.emit("SELECTED_CONFIGURATION", findOption);

    return e.target.value;
  };

  return (
    <Box width="100%" role="@dino-roomconfig">
      <FormControl>
        <FormLabel>{t("home.room-configuration")}</FormLabel>
        <Tooltip label={t("home.disable-room-config")}>
          <span>
            <Select
              disabled={process.env.NODE_ENV !== "test"}
              selected={0}
              options={pointSystem}
              onChange={(e) => handleSetSelected(e)}
            />
          </span>
        </Tooltip>
      </FormControl>
    </Box>
  );
};
