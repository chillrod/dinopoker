import { useEffect, useState } from "react";
import dino from "../dino.json";
import { Helmet } from "react-helmet-async";

import {
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { Button } from "../components/atoms/button/button";
import { Input } from "../components/atoms/input/input";
import { Nav } from "../components/molecules/nav/nav";
import { SelectCharacter } from "../components/molecules/select-character/select-character";
import { emitter } from "../services/emitter/emitter";
import { PlayerService } from "../services/player/player.service";
import { NotificationsService } from "../services/notifications/notifications.service";
import { JoinRoomDialog } from "../components/molecules/dialog-joinroom/dialog-joinroom";
import { RoomsService } from "../services/rooms/rooms.service";
import { useNavigate } from "react-router-dom";
import { IPlayerData } from "../model/PlayerData";
import {
  getLocalStorage,
  setLocalStorage,
} from "../services/local-storage/handler";

export const Home = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [playerData, setPlayerData] = useState<IPlayerData>({
    character: 0,
    id: "",
  });

  const [loading, setLoading] = useState(false);

  const nameNotFilled = !playerData?.name?.length;

  const createRoom = async () => {
    setLoading(true);

    try {
      const { roomId, player } = await RoomsService.createRoom(playerData);

      localStorage.setItem("createdCharacter", JSON.stringify(playerData));

      navigate("game/" + roomId, {
        state: {
          player,
        },
      });
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async () => {
    NotificationsService.emitMessageBox({
      message: "joining",
      func: "SET_JOIN_ROOM",
      children: <JoinRoomDialog playerData={playerData} />,
    });

    setLocalStorage("createdCharacter", JSON.stringify(playerData));
  };

  useEffect(() => {
    emitter.on("PLAYER_CHARACTER", (data) => {
      setPlayerData((playerData) => ({ ...playerData, character: data }));
    });

    emitter.on("PLAYER_NAME", (data) => {
      setPlayerData((playerData) => ({ ...playerData, name: data }));
    });

    return () => {
      emitter.off("PLAYER_CHARACTER");
      emitter.off("PLAYER_NAME");
    };
  }, [nameNotFilled]);

  useEffect(() => {
    const createdCharacter: { name: string } =
      getLocalStorage("createdCharacter");

    if (createdCharacter?.name) {
      setPlayerData(createdCharacter);
    }

    return () => {};
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Online planningpoker for agile teams - dinopoker {dino.version}
        </title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Create a room and invite your team to join. Start planning your sprints and get feedback from your team."
        ></meta>
      </Helmet>
      <Grid
        maxW={["100%", "500px", "800px"]}
        gridTemplateAreas={`
      "nav"
      "heading"
      "player"
      "actions"
      `}
        margin="0 auto"
        gridTemplateRows="auto auto auto auto"
        gap={2}
        p={2}
      >
        <GridItem area="nav" w="100%" h="100%" p={4}>
          <Nav />
        </GridItem>
        <GridItem area="heading" p={3}>
          <Heading
            as="h1"
            fontWeight={400}
            textAlign="center"
            size={["lg", "xl"]}
          >
            {t("home.title")}
          </Heading>
        </GridItem>
        <GridItem area="player" p={3}>
          <SelectCharacter character={playerData?.character} />
        </GridItem>
        <GridItem
          area="actions"
          p={4}
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={4} maxW={["100%", "60%"]} margin="0 auto">
            <FormControl isInvalid={nameNotFilled}>
              <FormLabel>{t("home.type-your-name")}</FormLabel>
              <Input
                value={playerData?.name}
                onChange={(event) =>
                  PlayerService.PLAYER_NAME(event.target.value)
                }
                placeholder={t("home.type-your-name-placeholder")}
              />
            </FormControl>
            <Text fontSize="xl" textAlign="center">
              {t("home.select-gameplay-option")}
            </Text>
            <Flex justifyContent="space-around" gap={3}>
              <Button
                loading={loading}
                disabled={nameNotFilled}
                onClick={() => createRoom()}
              >
                {t("home.create-room")}
              </Button>
              <Button
                loading={loading}
                disabled={nameNotFilled}
                onClick={() => joinRoom()}
                bg="dino.secondary"
              >
                {t("home.join-room")}
              </Button>
            </Flex>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};
