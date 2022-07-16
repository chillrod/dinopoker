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
import { VoteSystemOptions } from "../../config/vote-system/vote-system";

import { IPlayerData } from "../../model/PlayerData";
import { emitter } from "../../services/emitter/emitter";

import { getLocalStorage } from "../../services/local-storage/handler";

import { NotificationsService } from "../../services/notifications/notifications.service";
import { PlayerService } from "../../services/player/player.service";
import { SelectParser } from "../../utils/SelectParser";
import { HeadText } from "../atoms/head-text/head-text";
import { Input } from "../atoms/input/input";
import { Select } from "../atoms/select/select";

const CreateRoomDialog = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const [playerData, setPlayerData] = useState<IPlayerData>({});

  const nameNotFilled = !playerData?.name?.length;

  const createRoom = async () => {
    try {
      NotificationsService.emitScreenLoading({
        show: true,
        message: "Creating game...",
      });
      await new Promise(function (resolve) {
        setTimeout(resolve, 2500);
      });

      await router.push("/game/223");

      NotificationsService.emitScreenLoading({
        show: false,
      });

      // const { uuid } = await RoomsService.createRoom();

      // setLocalStorage("createdCharacter", playerData);

      // await router.push(`/game/${uuid}`);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
    }
  };

  useEffect(() => {
    const createdCharacter: { name: string } =
      getLocalStorage("createdCharacter");

    if (createdCharacter?.name) {
      setPlayerData(createdCharacter);
    }

    return () => {};
  }, []);

  useEffect(() => {
    emitter.on("SET_CREATE_ROOM", () => {
      createRoom();
    });

    return () => {
      emitter.off("SET_CREATE_ROOM");
    };
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
                <FormLabel>Selecione o modelo de pontuação</FormLabel>
                <Select
                  options={SelectParser({
                    options: VoteSystemOptions,
                    key: "voteSystem",
                  })}
                  onChange={(event) => console.log(event.target.value)}
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
