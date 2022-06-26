import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
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
      const { roomId, preparedPlayer } = await RoomsService.createRoom(
        playerData
      );

      navigate("room/" + roomId, {
        state: {
          player: preparedPlayer,
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
  }, []);

  return (
    <Container as="section">
      <Grid templateRows="1fr 1fr 2fr" gap={8} justifyContent="center">
        <GridItem alignSelf="center" gridRow={1}>
          <Nav />
        </GridItem>
        <GridItem alignSelf="center" gridRow={2}>
          <Heading fontWeight={400} textAlign="center" size="lg">
            {t("home.select-your-avatar-and-join-or-create-a-room")}
          </Heading>
        </GridItem>
        <GridItem alignSelf="center" justifySelf="center">
          <SelectCharacter />
        </GridItem>
        <GridItem alignSelf="center">
          <Grid gap={6}>
            <Box w="50%" margin="0 auto">
              <FormControl isInvalid={nameNotFilled}>
                <Input
                  onChange={(event) =>
                    PlayerService.PLAYER_NAME(event.target.value)
                  }
                  placeholder={t("home.type-your-name")}
                />
              </FormControl>
            </Box>
            <Text fontSize="md" textAlign="center">
              {t("home.select-gameplay-option")}
            </Text>
            <Flex justifyContent="center" gap={3}>
              <Box justifySelf="center">
                <Button
                  loading={loading}
                  disabled={nameNotFilled}
                  onClick={() => createRoom()}
                >
                  {t("home.create-a-room")}
                </Button>
              </Box>
              <Box justifySelf="center">
                <Button
                  loading={loading}
                  disabled={nameNotFilled}
                  onClick={() => joinRoom()}
                  bg="dino.secondary"
                >
                  {t("home.or-join-a-room")}
                </Button>
              </Box>
            </Flex>
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
};
