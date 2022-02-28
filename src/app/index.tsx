import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChatMessages } from "../components/molecules/chat-messages/chat-messages";
import { IMenu, Menu } from "../components/molecules/menu/menu";
import { Home } from "../organisms/home";

import {
  LinkIcon,
  RepeatIcon,
  SettingsIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";

const actions: IMenu = {
  menuItems: [
    {
      icon: <LinkIcon />,
      label: "Share",
    },
    {
      icon: <RepeatIcon />,
      label: "Restart",
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
    },
    {
      icon: <SmallCloseIcon />,
      label: "Close",
    },
  ],
};

export const App = () => {
  return (
    <>
      <SimpleGrid p={1}>
        <Flex>
          <Menu menuItems={actions.menuItems} />
          <Home />
        </Flex>
      </SimpleGrid>
    </>
  );
};
