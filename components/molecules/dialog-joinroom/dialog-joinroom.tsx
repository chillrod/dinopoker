import { FormControl, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IPlayerData } from "../../../model/PlayerData";
import { emitter } from "../../../services/emitter/emitter";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { RoomsService } from "../../../services/rooms/rooms.service";
import { Input } from "../../atoms/input/input";

export const JoinRoomDialog = ({ playerData }: { playerData: IPlayerData }) => {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoinRoom = async ({
    playerData,
    roomId,
  }: {
    playerData: IPlayerData;
    roomId: string;
  }) => {
    NotificationsService.emitMessageBoxLoading(true);

    if (!roomId.length) {
      NotificationsService.emitMessageBoxLoading(false);

      return NotificationsService.emitToast("Digite um id válido");
    }

    const player: IPlayerData = {
      ...playerData,
      room: roomId,
    };

    try {
      await RoomsService.joinPlayerToRoom(player);

      NotificationsService.emitMessageBoxClose();

      await router.prefetch(`/game/${roomId}`);

      router.push(`/game/${roomId}`);
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      NotificationsService.emitMessageBoxLoading(false);
    }
  };

  useEffect(() => {
    emitter.on("SET_JOIN_ROOM", () => {
      handleJoinRoom({ playerData, roomId });
    });

    return () => {
      emitter.off("SET_JOIN_ROOM");
    };
  }, [roomId]);

  return (
    <SimpleGrid gap={2}>
      <Text textAlign="center" as="h2" color="dino.text" fontWeight={500}>
        Digite o ID da sala
      </Text>
      <FormControl isInvalid={!roomId.length}>
        <Input
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="6MEanqDk42g4hVSziP7q2L"
        />
      </FormControl>
    </SimpleGrid>
  );
};
