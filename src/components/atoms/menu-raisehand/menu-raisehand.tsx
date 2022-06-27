import { child, getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { ThumbsUp } from "react-feather";
import { app } from "../../../main";
import { NotificationsService } from "../../../services/notifications/notifications.service";
import { RoomsService } from "../../../services/rooms/rooms.service";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuRaiseHand = () => {
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
      NotificationsService.emitToast(err.message)
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
    if (!isRaisingHand) return "dino.secondary";

    return "dino.primary";
  };

  const returnColor = () => {
    if (!isRaisingHand) return "dino.primary";

    return "dino.base4";
  };

  return (
    <IconButton
      onClick={() => handleRaiseHand()}
      color={returnColor()}
      bg={returnBg()}
      ariaLabel="Raise hand"
      icon={<ThumbsUp />}
    />
  );
};
