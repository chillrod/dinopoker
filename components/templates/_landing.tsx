import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { emitter } from "../../services/emitter/emitter";
import { NotificationsService } from "../../services/notifications/notifications.service";

import { ButtonBox } from "../atoms/button-box/button-box";
import { Button } from "../atoms/button/button";
import { HeadText } from "../atoms/head-text/head-text";
import JoinRoomDialog from "./_join-room-dialog";
import CreateRoomDialog from "./_create-room-dialog";
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
    <PlainTemplate>
      <GridItem gridArea="dino" justifySelf="start">
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
        <Img w={[100, 200, 300, 250]} h="100%" src="/dino3.svg" />
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
                We connect your team with a funny tools to handle your sprint's
                planning, retrospectives and more
              </Text>
              <GridItem display={["block", "block", "none"]}>
                <Button onClick={() => handleCreate()} size="lg">
                  Try planning poker free
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem gridArea="dino" display={["none", "none", "block"]}>
            <Flex gap={2} alignItems="center" w="100%" wrap="wrap">
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
