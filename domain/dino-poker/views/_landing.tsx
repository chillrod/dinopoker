import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NotificationsService } from "../../../providers/notifications/notifications.service";

import { ButtonBox } from "../../../components/atoms/button-box/button-box";
import { Button } from "../../../components/atoms/button/button";
import { HeadText } from "../../../components/atoms/head-text/head-text";

import JoinRoomDialog from "../components/join-room-dialog";
import CreateRoomDialog from "../components/create-room-dialog";
import { PlainTemplate } from "../../../components/templates/_plain-template";

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
      children: <JoinRoomDialog room="" />,
    });
  };

  return (
    <PlainTemplate
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
    "dino hero"
    "dino hero"
      `,
      ]}
      rows={["1fr", "1fr", "1fr", "1fr 1fr"]}
      cols={["1fr", "1fr", "1fr", "1fr 1fr"]}
    >
      <GridItem gridArea="dino" justifySelf="start" alignSelf="center">
        <Heading fontWeight={800} fontSize="2xl" mb={2}>
          Timeline
        </Heading>
        <HeadText
          head="Our goal"
          tags={[
            "Dino poker is currently in beta!",
            `Our goal is to provide a full solution to 
            handle phases of the Scrum framework.`,
            `Currently, we have a functional planning poker tool, 
            that is completely free.`,
          ]}
        />
        <Img mt={5} w={[100, 200, 300, 250]} h="100%" src="/dino3.svg" />
      </GridItem>
      <GridItem gridArea="hero" alignSelf="start">
        <Grid
          gap={12}
          gridTemplateAreas={`
        "cta cta"
        "dino dino"
        `}
        >
          <GridItem gridArea="cta" alignSelf="end">
            <Grid gap={6}>
              <Heading fontSize={["2em", "2.5em", "3em"]} fontWeight={600}>
                Plan your agile sprints in a fun environment with dinosaurs!
              </Heading>
              <Text fontSize="lg">
                We connect your team with a funny tools to handle your sprints
                planning, retrospectives and more
              </Text>
              <GridItem display={["block", "block", "block", "none"]}>
                <Stack spacing={2}>
                  <Button onClick={() => handleCreate()} size="lg">
                    Try planning poker free
                  </Button>
                  <Button
                    bg="dino.secondary"
                    onClick={() => handleJoin()}
                    size="sm"
                  >
                    Or join a room
                  </Button>
                </Stack>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem gridArea="dino" display={["none", "none", "none", "block"]}>
            <Flex
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
          </GridItem>
        </Grid>
      </GridItem>
    </PlainTemplate>
  );
};
