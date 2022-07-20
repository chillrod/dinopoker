import { Flex, Text } from "@chakra-ui/react";
import { child, getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

import { Codepen, Server } from "react-feather";

import useTranslation from "next-translate/useTranslation";
import { appFirebase } from "../../../config/firebase/firebase";
import { getLocalStorage } from "../../../providers/local-storage/handler";

import { NotificationsService } from "../../../providers/notifications/notifications.service";
import { RoomsService } from "../services/rooms/rooms.service";
import { IconButton } from "../../../components/atoms/icon-button/icon-button";

export const MenuTeam = () => {
  const { t } = useTranslation("common");

  const [currentTeam, setCurrentTeam] = useState(0);

  const handleTeamChange = async (team: number) => {
    try {
      // await RoomsService.updatePlayerTeam(
      //   getLocalStorage("character")?.player,
      //   team
      // );
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    }
  };

  useEffect(() => {
    const db = getDatabase(appFirebase);

    const teamStatus = child(
      ref(db),
      "dinopoker-room/" +
      getLocalStorage("character")?.player.room +
      "/players/" +
      getLocalStorage("character")?.player.id +
      "/team"
    );

    const unsubRoomDbRef = onValue(teamStatus, (data) => {
      setCurrentTeam(data.val());
    });

    return () => {
      unsubRoomDbRef();
    };
  }, []);

  const returnBg = (team: number) => {
    const state: { [key: number]: string } = {
      1: "purple.300",
      2: "purple.300",
      3: "purple.500",
    };

    if (team === currentTeam) return state[currentTeam];

    return "purple.500";
  };

  const returnColor = (team: number) => {
    return "dino.base4";
  };

  return (
    <>
      <Flex gap={3} alignItems="center" w="100%">
        <Text fontSize="sm" fontWeight={600}>
          {t("poker.actions.teams-action")}
        </Text>

        <IconButton
          onClick={() => handleTeamChange(1)}
          color={returnColor(1)}
          bg={returnBg(1)}
          ariaLabel={t("poker.actions.team-one")}
          icon={<Server />}
        />
        <IconButton
          onClick={() => handleTeamChange(2)}
          color={returnColor(2)}
          bg={returnBg(2)}
          ariaLabel={t("poker.actions.team-two")}
          icon={<Codepen />}
        />
      </Flex>
    </>
  );
};
