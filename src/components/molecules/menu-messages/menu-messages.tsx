import { ChatIcon } from "@chakra-ui/icons";

import {
  Grid,
  GridItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ChatMessage } from "../../atoms/chat-message/chat-message";
import { EmptyData } from "../../atoms/empty-data/empty-data";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const MenuMessages = () => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <IconButton
          color="dino.base1"
          ariaLabel="Messages"
          icon={<ChatIcon />}
        />
      </PopoverTrigger>
      <PopoverContent
        maxW="15em"
        p={2}
        bg="dino.base4"
        borderRadius="md"
        outline="none"
        border="none"
      >
        <PopoverHeader border="none">
          <Grid alignItems="center">
            <Text color="dino.text" fontWeight={600}>
              Messages
            </Text>
            <PopoverCloseButton
              bg="dino.base2"
              borderRadius="full"
              color="dino.text"
            />
          </Grid>
        </PopoverHeader>
        <PopoverBody>
          {true && (
            <Grid gap={2}>
              <GridItem maxH="150px" overflow="auto">
                <Stack>
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                </Stack>
              </GridItem>
              <GridItem>
                <EmptyData data="messages" />
              </GridItem>
            </Grid>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
