import WheelComponent from "../../lib/wheel";
import { Box, Text } from "@chakra-ui/react";
import { WheelColorsPicker } from "../../../utils/WheelColorsPicker";
import { NotificationsService } from "../../../services/notifications/notifications.service";

interface WheelPlayProps {
  members: string[];
}

export const WheelPlay = (props: WheelPlayProps) => {
  const listOfChakraUIColors = props.members.map((_, index) =>
    WheelColorsPicker(index)
  );

  return (
    <WheelComponent
      isOnlyOnce={false}
      winningSegment="Daily"
      segments={props.members}
      segColors={listOfChakraUIColors}
      onFinished={(winner) =>
        NotificationsService.emitMessageBox({
          children: (
            <Box>
              <Text>
                Today's daily organizer goes to <Text as="span" fontWeight="bold" fontSize="lg"> {winner}</Text>
              </Text>
            </Box>
          ),
          message: "",
        })
      }
    />
  );
};
