import { Flex, Text } from "@chakra-ui/react";
import { child, getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { Speaker } from "react-feather";
import { useTranslation } from "react-i18next";
import { app } from "../../../main";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { RoomsService } from "../../../services/rooms/rooms.service";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRaiseHand = () => {
  const { t } = useTranslation();

  const getCurrentPlayer = JSON.parse(
    localStorage.getItem("character") || "{}"
  );

  const [isRaisingHand, setIsRaisingHand] = useState(true);

  const db = getDatabase(app);

  const handleRaiseHand = async () => {
    try {
      await RoomsService.updatePlayerRaiseHand(
        getCurrentPlayer.player,
        !isRaisingHand
      );
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    }
  };

  useEffect(() => {
    const roomStatus = child(
      ref(db),
      "dinopoker-room/" +
        getCurrentPlayer?.player?.room +
        "/players/" +
        getCurrentPlayer?.player?.id +
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
