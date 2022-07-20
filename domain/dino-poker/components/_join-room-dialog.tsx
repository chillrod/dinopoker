import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { useCallback, useEffect, useState } from "react";

import { IPlayerData } from "../interface/PlayerData";
import { emitter } from "../../../providers/emitter/emitter";

import {
  getLocalStorage,
  setLocalStorage,
} from "../../../providers/local-storage/handler";

import { NotificationsService } from "../../../providers/notifications/notifications.service";
import { PlayerService } from "../services/player/player.service";
import { RoomsService } from "../services/rooms/rooms.service";
import { Button } from "../../../components/atoms/button/button";
import { HeadText } from "../../../components/atoms/head-text/head-text";
import { Input } from "../../../components/atoms/input/input";

const JoinRoomDialog = ({ room }: { room?: string }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [playerData, setPlayerData] = useState<IPlayerData>({
    name: "",
    room: room || "",
  });

  const nameNotFilled = !playerData?.name?.length;

  const joinRoom = async () => {
    if (!playerData.name) return;

    setLocalStorage("created-data", {
      ...getLocalStorage("created-data"),
      name: playerData.name,
    });

    const preparedPlayer = PlayerService.preparePlayer({
      ...playerData,
      room: room || "",
    });

    try {
      NotificationsService.emitScreenLoading({
        show: true,
        message: "Joining game...",
      });

      await RoomsService.JOIN_ROOM({
        player: { ...preparedPlayer, ...playerData },
      });

      await router.push(`/game/${preparedPlayer.room}`);
    } catch (err: any) {
      NotificationsService.emitToast({
        message: err.message,
        state: "error",
      });

      await router.push("/");
    } finally {
      NotificationsService.emitScreenLoading({
        show: false,
      });
    }
  };

  useEffect(() => {
    const createdCharacter: { name: string } = getLocalStorage("created-data");

    if (createdCharacter) {
      setPlayerData(createdCharacter);
    }

    return () => { };
  }, []);

  useEffect(() => {
    // emitter.on("SET_JOIN_ROOM", () => {
    //   joinRoom();
    // });

    // return () => {
    //   emitter.off("SET_JOIN_ROOM");
    // };
  });

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
          <HeadText head="Almost joining the room" />
        </GridItem>
        <GridItem area="actions" w="100%">
          <FormControl isInvalid={nameNotFilled}>
            <Stack spacing={6}>
              <Box>
                <FormLabel>{t("home.type-your-name")}</FormLabel>
                <Input
                  value={playerData.name}
                  onChange={(event) =>
                    setPlayerData({
                      ...playerData,
                      name: event.target.value,
                    })
                  }
                  placeholder={t("home.type-your-name-placeholder")}
                />
              </Box>
              <Box>
                <FormLabel>{t("home.type-room-id")}</FormLabel>
                <Input
                  disabled={!!room}
                  value={room || ""}
                  onChange={(event) =>
                    setPlayerData({
                      ...playerData,
                      room: event.target.value,
                    })
                  }
                  placeholder={t("home.type-room-id")}
                />
              </Box>
              {room && (
                <Grid>
                  <GridItem justifySelf="end">
                    <Button
                      onClick={() => NotificationsService.emitMessageBoxClose()}
                      bg="dino.secondary"
                      size="sm"
                    >
                      Join as spectator
                    </Button>
                  </GridItem>
                </Grid>
              )}
            </Stack>
          </FormControl>
        </GridItem>
      </Grid>
    </>
  );
};

export default JoinRoomDialog;
