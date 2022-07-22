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

import { useEffect, useState } from "react";
import { VoteSystemOptions } from "../../config/vote-system/vote-system";

import { IPlayerData } from "../../model/PlayerData";
import { IRoomData } from "../../model/RoomData";
import { emitter } from "../../services/emitter/emitter";

import { getLocalStorage, setLocalStorage } from "../../services/local-storage/handler";

import { NotificationsService } from "../../services/notifications/notifications.service";
import { RoomsService } from "../../services/rooms/rooms.service";
import { SelectParser } from "../../utils/SelectParser";
import { HeadText } from "../atoms/head-text/head-text";
import { Input } from "../atoms/input/input";
import { Select } from "../atoms/select/select";

const CreateRoomDialog = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const [playerData, setPlayerData] = useState<IPlayerData>({
    name: "" || getLocalStorage("user-name")?.name,
  });

  const [roomData, setRoomData] = useState<IRoomData>({
    voteSystem: Object.keys(VoteSystemOptions)[0]
  });


  const createRoom = async () => {

    if (!playerData.name?.length) return;

    setLocalStorage('user-name', { name: playerData.name });

    try {
      NotificationsService.emitScreenLoading({
        show: true,
        message: "Creating game...",
      });

      const { playerFromCreateRoom } = await RoomsService.CREATE_ROOM({
        player: playerData,
        voteSystem: roomData.voteSystem,
      });


      NotificationsService.emitScreenLoading({
        show: true,
        message: "Joining game...",
      });

      await RoomsService.JOIN_ROOM({
        player: playerFromCreateRoom,
      })



      await router.push(`/game/${playerFromCreateRoom.room}`);
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
  };

  useEffect(() => {
    emitter.on("SET_CREATE_ROOM", () => {
      createRoom();
    });

    return () => {
      emitter.off("SET_CREATE_ROOM");
    };
  }, [playerData, roomData]);

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
          <FormControl isInvalid={!playerData.name?.length}
          >
            <Stack spacing={6}>
              <Box>
                <FormLabel>{t("home.type-your-name")}</FormLabel>
                <Input
                  value={playerData.name}
                  placeholder={t("home.type-your-name-placeholder")}
                  onChange={(event) => {
                    setPlayerData({ ...playerData, name: event.target.value });
                  }}
                />
              </Box>
              <Box>
                <FormLabel>Selecione o modelo de pontuação</FormLabel>
                <Select
                  options={SelectParser({
                    options: VoteSystemOptions,
                    key: "voteSystem",
                  })}
                  onChange={(event) => {
                    setRoomData({ voteSystem: event.target.value });
                  }}
                />
              </Box>
            </Stack>
          </FormControl>
        </GridItem>
      </Grid>
    </>
  );
};

export default CreateRoomDialog;
