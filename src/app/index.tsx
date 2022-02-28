import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChatMessages } from "../components/molecules/chat-messages/chat-messages";
import { IMenu, Menu } from "../components/molecules/menu/menu";
import { Home } from "../organisms/home";

import {
  EmailIcon,
  LinkIcon,
  RepeatIcon,
  SettingsIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { CardPoints } from "../components/atoms/card-points/card-points";

const actions: IMenu = {
  menuItems: [
    {
      icon: <LinkIcon />,
      label: "Share",
    },
    {
      icon: <EmailIcon />,
      label: "Messages",
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
        <Flex gap={3}>
          <Menu menuItems={actions.menuItems} />
          <CardPoints />
          {/* <Home /> */}
        </Flex>
      </SimpleGrid>
    </>
  );
};
