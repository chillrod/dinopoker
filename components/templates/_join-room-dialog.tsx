import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";

import { useCallback, useEffect, useState } from "react";

import { IPlayerData } from "../../model/PlayerData";
import { emitter } from "../../services/emitter/emitter";

import { getLocalStorage } from "../../services/local-storage/handler";

import { NotificationsService } from "../../services/notifications/notifications.service";
import { PlayerService } from "../../services/player/player.service";
import { HeadText } from "../atoms/head-text/head-text";
import { Input } from "../atoms/input/input";

const JoinRoomDialog = () => {
  const { t } = useTranslation("common");

  const [playerData, setPlayerData] = useState<IPlayerData>({});

  const nameNotFilled = !playerData?.name?.length;

  const joinRoom = useCallback(async () => {
    try {
      NotificationsService.emitScreenLoading({
        show: true,
        message: "Joining game...",
      });

      await new Promise(function (resolve) {
        setTimeout(resolve, 2500);
      });

      NotificationsService.emitScreenLoading({
        show: false,
      });
      // const { uuid } = await RoomsService.joinRoom();

      // setLocalStorage("createdCharacter", playerData);

      // await router.push(`/game/${uuid}`);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
    }
  }, []);

  useEffect(() => {
    const createdCharacter: { name: string } =
      getLocalStorage("createdCharacter");

    if (createdCharacter?.name) {
      setPlayerData(createdCharacter);
    }

    return () => {};
  }, []);

  useEffect(() => {
    emitter.on("SET_JOIN_ROOM", () => {
      joinRoom();
    });

    return () => {
      emitter.off("SET_JOIN_ROOM");
    };
  }, []);

  return (
    <>
      <Grid
        gridTemplateAreas={`
      "text"
      "actions"
      `}
        gridTemplateRows="auto"
        gap={6}
      >
        <GridItem area="text">
          <HeadText head="Almost creating a new fancing room" />
        </GridItem>
        <GridItem area="actions" w="100%">
          <FormControl isInvalid={nameNotFilled}>
            <Stack spacing={6}>
              <Box>
                <FormLabel>{t("home.type-your-name")}</FormLabel>
                <Input
                  value={playerData.name}
                  onChange={(event) =>
                    PlayerService.PLAYER_NAME(event.target.value)
                  }
                  placeholder={t("home.type-your-name-placeholder")}
                />
              </Box>
              <Box>
                <FormLabel>{t("home.type-room-id")}</FormLabel>
                <Input
                  value={playerData.name}
                  onChange={(event) =>
                    PlayerService.PLAYER_NAME(event.target.value)
                  }
                  placeholder={t("home.type-room-id")}
                />
              </Box>
            </Stack>
          </FormControl>
        </GridItem>
      </Grid>
    </>
  );
};

export default JoinRoomDialog;
