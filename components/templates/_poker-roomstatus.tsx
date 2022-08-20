import { Flex, Img, Tag } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

import { RoomDataStatus } from "../../model/RoomData";
import { Button } from "../atoms/button/button"

export const PokerRoomStatus = ({ roomStatus, isRevealed }: { roomStatus?: number, isRevealed: boolean }) => {

    const { t } = useTranslation("common");

    const [revealingTimeout, setRevealingTimeout] = useState(3);
    const [voteLoading, setVoteLoading] = useState(false);

    const parseActionsAndTextBasedOnStatus = (roomStatus?: number) => {
        const states: { [status: number]: string } = {
            1: t("poker.actions.reveal-votes"),
            2: t("poker.actions.restart-votes"),
        };

        if (!roomStatus) return;


        return states[roomStatus];
    };

    const stateHandler: { [key: number]: () => React.ReactElement } = {
        1: () => {
            return (
                <Button
                    loading={voteLoading}
                // onClick={() => updateRoomStatus(roomStatus)}
                >
                    {parseActionsAndTextBasedOnStatus(roomStatus) || "Carregando..."}
                </Button>
            );
        },

        2: () => {
            return (
                <Flex direction="column" justifyContent="center">
                    <Tag fontSize="lg" colorScheme="purple" fontWeight={600}>
                        {t("poker.actions.revealing-in")} {revealingTimeout}
                    </Tag>
                    <Img src="/dino1.svg" w="50px" margin="0 auto" mt={5} />
                </Flex>
            );
        },

        3: () => {
            return (
                <>
                    <Button
                        loading={voteLoading}
                    // onClick={() => updateRoomStatus(roomStatus)}
                    >
                        {/* {parseActionsAndTextBasedOnStatus(roomStatus) || "Carregando..."} */}
                    </Button>

                    <Flex mt={2}>
                        <Tag fontSize={["sm", "sm", "lg"]} mx={2}>
                            {t("poker.actions.team-1-note")}:{" "}
                            {/* {calculateMd("team1").max || 0} */}
                        </Tag>
                        <Tag fontSize={["sm", "sm", "lg"]} mx={2}>
                            {t("poker.actions.team-2-note")}:{" "}
                            {/* {calculateMd("team2").max || 0} */}
                        </Tag>
                    </Flex>
                </>
            );
        },
    };


    return (
        <div><p>

            {roomStatus ? (
                <>
                    {stateHandler[roomStatus]()}
                </>
            ) : <></>}
        </p></div>
    )


}