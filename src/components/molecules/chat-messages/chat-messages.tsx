import { useState } from "react";
import { Grid, GridItem, Stack, Text, Box, Flex } from "@chakra-ui/react";
import { ChatMessage } from "../../atoms/chat-message/chat-message";
import { EmptyData } from "../../atoms/empty-data/empty-data";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { MessageCircle } from "react-feather";
import { MenuChangeLanguage } from "../menu-changelanguage/menu-changelanguage";
import { motion } from "framer-motion";

export const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [closed, setClosed] = useState(true);

  return (
    <Grid gap={6} p={4}>
      <Flex justifySelf="center" gap={1}>
        <IconButton
          color="dino.base1"
          onClick={() => setClosed(!closed)}
          ariaLabel="Messages"
          icon={<MessageCircle />}
        />
        <MenuChangeLanguage />
      </Flex>
      {!closed && (
        <GridItem
          bg="dino.secondary"
          borderRadius="md"
          maxH="150px"
          overflow="auto"
          fontSize="md"
          p={3}
        >
          <Text fontSize="sm" fontWeight={500}>
            Messages
          </Text>
          <Stack>{messages.length && <ChatMessage character={0} />}</Stack>
          <EmptyData data="messages yet" />
        </GridItem>
      )}
    </Grid>
  );
};
