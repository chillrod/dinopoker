import { Box, FormControl, FormLabel, Grid, GridItem, Stack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { InitializePlayerData, IPlayerData } from "../../model/PlayerData";
import { emitter } from "../../services/emitter/emitter";
import { getLocalStorage, setLocalStorage } from "../../services/local-storage/handler";
import { NotificationsService } from "../../services/notifications/notifications.service";
import { RoomsService } from "../../services/rooms/rooms.service";
import { Button } from "../atoms/button/button";
import { HeadText } from "../atoms/head-text/head-text";
import { Input } from "../atoms/input/input";

const JoinRoomDialog = ({ room }: { room?: string }) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const { id } = router.query


  const [playerData, setPlayerData] = useState<IPlayerData>({
    name: "" || getLocalStorage("user-name")?.name,
    room: '' || room
  });

  const [spectatorLoading, setSpectatorLoading] = useState(false)


  const handleJoinAsSpectator = async () => {
    try {

      NotificationsService.emitMessageBoxLoading(true);
      setSpectatorLoading(true);

      await RoomsService.SET_SPECTATOR({ roomId: id })

      NotificationsService.emitMessageBoxClose()

    } catch (err: any) {
      NotificationsService.emitToast({
        message: err.message,
        state: "error"
      })
    } finally {
      NotificationsService.emitMessageBoxLoading(false);
      setSpectatorLoading(false);
    }

  }

  const joinRoom = async () => {
    if (!playerData.name?.length || !playerData.room?.length) return;

    setLocalStorage('user-name', { name: playerData.name });

    try {
      NotificationsService.emitScreenLoading({
        show: true,
        message: "Joining game...",
      });

      const player = InitializePlayerData({
        ...playerData,
      });

      await RoomsService.JOIN_ROOM({
        player
      })

      await router.push(`/game/${player.room}`);
    } catch (err: any) {
      NotificationsService.emitToast({
        message: err.message,
        state: 'error'
      });

    } finally {
      NotificationsService.emitScreenLoading({
        show: false,
      });
    }
  }

  useEffect(() => {
    emitter.on("SET_JOIN_ROOM", () => {
      joinRoom();
    });

    return () => {
      emitter.off("SET_JOIN_ROOM");
    };
  }, [playerData]);

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
          <FormControl isInvalid={!playerData?.name?.length || !playerData?.room?.length}
          >
            <Stack spacing={6}>
              <Box>
                <FormLabel>{t("home.type-your-name")}</FormLabel>
                <Input
                  value={playerData.name}
                  onChange={(event) => {
                    setPlayerData({ ...playerData, name: event.target.value });
                  }}
                  placeholder={t("home.type-your-name-placeholder")}
                />
              </Box>
              <Box>
                <FormLabel>{t("home.type-room-id")}</FormLabel>
                <Input
                  value={playerData.room}
                  disabled={!!room}
                  onChange={(event) => {
                    setPlayerData({ ...playerData, room: event.target.value });
                  }}
                  placeholder={t("home.type-room-id")}
                />
              </Box>
              {room && (
                <Grid>
                  <GridItem justifySelf="end">
                    <Button
                      loading={spectatorLoading}
                      onClick={() => handleJoinAsSpectator()}
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
