import { Flex, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { Speaker } from "react-feather";

import { getLocalStorage } from "../../../services/local-storage/handler";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { RoomsService } from "../../../services/rooms/rooms.service";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRaiseHand = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const { id } = router.query

  const [isRaisingHand, setIsRaisingHand] = useState(false);

  const handleRaiseHand = async (raisingHand: boolean) => {
    try {
      RoomsService.UPDATE_PLAYER({
        roomId: id,
        key: 'raiseHand',
        value: !raisingHand,
        player: getLocalStorage('user-client-key')
      })

    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    }
  };

  const returnBg = (raisingHand: boolean) => {
    if (raisingHand) return "purple.500";

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
          onClick={() => [setIsRaisingHand(!isRaisingHand), handleRaiseHand(!isRaisingHand)]}
          color={returnColor()}
          bg={returnBg(isRaisingHand)}
          ariaLabel={t("poker.actions.raise-hand")}
          icon={<Speaker />}
        />
      </Flex>
    </>
  );
};
