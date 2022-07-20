import { Flex, Text } from "@chakra-ui/react";
import { child, getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { Speaker } from "react-feather";

import useTranslation from "next-translate/useTranslation";

import { appFirebase } from "../../../config/firebase/firebase";
import { getLocalStorage } from "../../../providers/local-storage/handler";
import { NotificationsService } from "../../../providers/notifications/notifications.service";
import { RoomsService } from "../services/rooms/rooms.service";
import { IconButton } from "../../../components/atoms/icon-button/icon-button";

export const MenuRaiseHand = () => {
  const { t } = useTranslation("common");

  const [isRaisingHand, setIsRaisingHand] = useState(true);

  const handleRaiseHand = async () => {
    try {
      // await RoomsService.updatePlayerRaiseHand(
      //   getLocalStorage("character")?.player,
      //   !isRaisingHand
      // );
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    }
  };

  useEffect(() => {
    const db = getDatabase(appFirebase);

    const roomStatus = child(
      ref(db),
      "dinopoker-room/" +
      getLocalStorage("character")?.player.room +
      "/players/" +
      getLocalStorage("character")?.player?.id +
      "/raiseHand"
    );

    const unsubRoomDbRef = onValue(roomStatus, (data) => {
      setIsRaisingHand(data.val());
    });

    return () => {
      unsubRoomDbRef();
    };
  }, []);

  const returnBg = () => {
    if (!isRaisingHand) return "purple.500";

    return "purple.300";
  };

  const returnColor = () => {
    return "dino.base4";
  };

  return (
    <>
      <Flex w="100%" gap={3} alignItems="center">
        <Text fontSize="sm" fontWeight={600}>
          {t("poker.actions.room-action")}
        </Text>
        <IconButton
          onClick={() => handleRaiseHand()}
          color={returnColor()}
          bg={returnBg()}
          ariaLabel={t("poker.actions.raise-hand")}
          icon={<Speaker />}
        />
      </Flex>
    </>
  );
};
