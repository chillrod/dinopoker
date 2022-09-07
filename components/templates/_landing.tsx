import { Box, Flex, GridItem, Heading, Highlight, Stack, Text } from "@chakra-ui/react";

import { NotificationsService } from "../../services/notifications/notifications.service";
import { ButtonBox } from "../atoms/button-box/button-box";
import { Button } from "../atoms/button/button";
import { HeadText } from "../atoms/head-text/head-text";
import CreateRoomDialog from "./_create-room-dialog";
import JoinRoomDialog from "./_join-room-dialog";
import { PlainTemplate } from "./_plain-template";

export const Landing = () => {
  const handleCreate = () => {
    NotificationsService.emitMessageBox({
      children: <CreateRoomDialog />,
      message: "",
      func: "SET_CREATE_ROOM",
    });
  };

  const handleJoin = () => {
    NotificationsService.emitMessageBox({
      message: "joining",
      func: "SET_JOIN_ROOM",
      children: <JoinRoomDialog />,
    });
  };

  return (
    <PlainTemplate
      align="center"
      areas={[
        `
    "hero hero"
    "dino dino"
    `,
        `
    "hero hero"
    "dino dino"
      `,
        `
    "hero hero"
    "dino dino"
      `,
        `
    "hero dino"
    "hero dino"
      `,
      ]}
      cols={["1fr", "1fr", "1fr", "auto auto"]}
    >

      <GridItem
        gridArea="hero"
        alignSelf="start"
      >

        <Stack spacing={3}
          direction="column"
        >
          <Heading as='h1' fontSize={['3xl', '3xl', '4xl', '6xl']} fontWeight={600}>
            <Highlight
              query={['real time', 'with your teammates']}
              styles={{ color: 'dino.primary' }}
            >
              Improve sprint estimates with real time connection with your teammates
            </Highlight>
          </Heading>
          <Text
            fontSize={['lg', 'lg', 'xl', '2xl']}
          >
            <Highlight
              query="planning poker tool"
              styles={{ fontWeight: 800, color: 'dino.text' }}
            >
              We connect your team to a game like planning poker tool,
            </Highlight>
            <br />
            making the estimation phase less boring and way less static.
          </Text>

          <Box display={['block', 'block', 'block', 'none']}>
            <Button onClick={() => handleCreate()} size="lg">
              Try planning poker free
            </Button>
          </Box>
          <Box display={['block', 'block', 'block', 'none']}>

            <Button
              bg="dino.secondary"
              onClick={() => handleJoin()}
              size="sm"
            >
              Or join a room
            </Button>
          </Box>
          <Flex
            display={['none', 'none', 'none', 'inherit']}
            gap={2}
            alignItems="center"
            w="100%"
            wrap={["wrap", "nowrap"]}
          >
            <ButtonBox
              onClick={() => handleCreate()}
              text="Create a planning poker room"
              image="/dino2.svg"
            />

            <ButtonBox
              onClick={() => handleJoin()}
              secondary
              text="Join a planning poker room"
              image="/dino3.svg"
            />
          </Flex>
        </Stack>

      </GridItem>

      <GridItem
        gridArea="dino"
        alignSelf="start"
        h="100%"
        justifySelf="center"
      >
        <HeadText
          head="Newsletter"
          tags={[
            "Dino poker is currently in beta!",
            `Our goal is to provide a full solution to 
            handle phases of the Scrum framework.`,
            `Currently, we have a functional planning poker tool, 
            that is completely free.`,
          ]}
        />
      </GridItem>
    </PlainTemplate >

  );
};
