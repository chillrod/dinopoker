import { Box, Flex } from "@chakra-ui/react";
import { emitter } from "../../../service/emitter/emitter";
import { chatMessages } from "../../../service/messages";
import { Button } from "../../atoms/button/button";

export const ChatMessages = () => {
  const emitMessage = (message: string) => {
    emitter.emit("EMIT_CHATMESSAGE", message);
  };

  return (
    <Box width="100%">
      <Flex gap={1}>
        {chatMessages.map((messages) => (
          <Button onClick={() => emitMessage(messages)}>{messages}</Button>
        ))}
      </Flex>
    </Box>
  );
};
