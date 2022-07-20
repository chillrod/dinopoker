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
import { VoteSystemOptions } from "../interface/vote-system/vote-system";

import { IPlayerData } from "../interface/PlayerData";

import {
  getLocalStorage,
  setLocalStorage,
} from "../../../providers/local-storage/handler";

import { NotificationsService } from "../../../providers/notifications/notifications.service";
import { PlayerService } from "../services/player/player.service";
import { RoomsService } from "../services/rooms/rooms.service";
import { SelectParser } from "../../../utils/SelectParser";
import { HeadText } from "../../../components/atoms/head-text/head-text";
import { Input } from "../../../components/atoms/input/input";
import { Select } from "../../../components/atoms/select/select";

const CreateRoomDialog = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const [playerData, setPlayerData] = useState<IPlayerData>({});
  const [voteSystem, setVoteSystem] = useState(
    Object.keys(VoteSystemOptions)[0]
  );

  const nameNotFilled = !playerData?.name?.length;

  const createRoom = async () => {
    if (!playerData.name) return;

    setLocalStorage("created-data", {
      ...getLocalStorage("created-data"),
      name: playerData.name,
    });

    try {
      const preparedPlayer = PlayerService.preparePlayer(playerData);

      NotificationsService.emitScreenLoading({
        show: true,
        message: "Creating game...",
      });

      const { playerFromCreateRoom } = await RoomsService.CREATE_ROOM({
        player: preparedPlayer,
        voteSystem,
      });

      NotificationsService.emitScreenLoading({
        show: true,
        message: "Joining character to room...",
      });

      await RoomsService.JOIN_ROOM({
        player: playerFromCreateRoom,
      });

      await router.push(`/game/${playerFromCreateRoom.room}`);
    } catch (err: any) {
      NotificationsService.emitToast({
        message: err.message,
        state: "error",
      });
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
    // emitter.on("SET_CREATE_ROOM", () => {
    //   createRoom();
    // });

    // return () => {
    //   emitter.off("SET_CREATE_ROOM");
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
                    setPlayerData({
                      ...playerData,
                      name: event.target.value,
                    })
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
                  onChange={(event) => setVoteSystem(event.target.value)}
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
