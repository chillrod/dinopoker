
import { useTranslation } from "react-i18next";

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
import { MessageCircle } from "react-feather";

export const MenuMessages = () => {
  const { t } = useTranslation();
  return (
    <Popover isLazy placement="bottom">
      <PopoverTrigger>
        <span>
          <IconButton
            color="dino.base1"
            ariaLabel={t("components.messages")}
            icon={<MessageCircle />}
          />
        </span>
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
              {t("components.messages")}
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
                  {/* TODO */}
                  {/* <ChatMessage /> */}
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
