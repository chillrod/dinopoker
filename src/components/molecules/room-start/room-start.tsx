import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  Box,
  FormControl,
  FormLabel,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";

import { Button } from "../../atoms/button/button";
import { InputIcon } from "../../atoms/input-icon/input-icon";

import { emitter } from "../../../service/emitter/emitter";
import { Check } from "react-feather";

interface IRoomStart {
  joinRoom?: (room: string) => void;
  createRoom?: () => void;
}

export const RoomStart = ({ joinRoom, createRoom }: IRoomStart) => {
  const { t } = useTranslation();

  const [canHandleRoom, setCanHandleRoom] = useState(false);

  useMemo(() => {
    emitter.on("CHARACTER_NAME", (name) => {
      if (name.length) {
        return setCanHandleRoom(true);
      }

      return setCanHandleRoom(false);
    });
  }, []);

  return (
    <Box role="@dino-roomstart">
      <SimpleGrid columns={2}>
        <FormControl>
          <FormLabel>{t("home.or-join-a-room")}</FormLabel>
          <InputIcon
            disabled={!canHandleRoom}
            confirm={(e) => (joinRoom ? joinRoom(e) : null)}
            ariaLabel={t("components.confirm-action")}
            placeholder={t("home.room-name")}
            icon={<Check />}
          />
        </FormControl>
        <Box gridColumn={2} alignSelf="end" justifySelf="end">
          <Button
            disabled={!canHandleRoom}
            onClick={() => (createRoom ? createRoom() : null)}
            action="confirm"
          >
            {t("home.create-room")}
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
