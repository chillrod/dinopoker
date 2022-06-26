import { useEffect, useState } from "react";

import { SimpleGrid, Text, FormControl } from "@chakra-ui/react";
import { Input } from "../../atoms/input/input";
import { emitter } from "../../../services/emitter/emitter";
import { RoomsService } from "../../../services/rooms/rooms.service";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { useNavigate } from "react-router-dom";
import { IPlayerData } from "../../../model/PlayerData";

export const JoinRoomDialog = ({ playerData }: { playerData: IPlayerData }) => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = async ({
    playerData,
    roomId,
  }: {
    playerData: IPlayerData;
    roomId: string;
  }) => {
    NotificationsService.emitMessageBoxLoading(true);

    try {
      const data = await RoomsService.joinRoom({ playerData, roomId });

      navigate("room/" + roomId, {
        state: {
          player: data,
        },
      });
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
    <SimpleGrid gap={5}>
      <Text textAlign="center" as="h2" color="dino.text" fontWeight={500}>
        Type the room id
      </Text>
      <FormControl isInvalid={!roomId.length}>
        <Input
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="ex: 35e26693-7659-493a-b6f1-a930b9a3ddfc"
        />
      </FormControl>
    </SimpleGrid>
  );
};
