import { Box, Center, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChatMessages } from "../components/molecules/chat-messages/chat-messages";
import { Menu } from "../components/molecules/menu/menu";
import { Home } from "../organisms/home";

export const App = () => {
  return (
    <>
      <SimpleGrid p={3}>
        <Flex>
          <Menu />
          <Home />
        </Flex>
        <Box justifySelf="center">
          <ChatMessages />
        </Box>
      </SimpleGrid>
    </>
  );
};
