import {
  AlertIcon,
  Box,
  Container,
  Flex,
  GridItem,
  Heading,
  Highlight,
  Icon,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";

import { NotificationsService } from "../../services/notifications/notifications.service";
import { ButtonBox } from "../atoms/button-box/button-box";
import { Button } from "../atoms/button/button";
import { HeadText } from "../atoms/head-text/head-text";
import CreateRoomDialog from "./_create-room-dialog";
import JoinRoomDialog from "./_join-room-dialog";
import { PlainTemplate } from "./_plain-template";
import { BarChart, CheckCircle, UserPlus, Users } from "react-feather";
import { WithSpeechBubbles } from "./_testimonials";
import { LargeWithLogoLeft } from "./_footer";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

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
    <div
      style={{
        opacity: 0.8,
        backgroundImage: "radial-gradient(#412f6e 0.5px, #111111 0.5px)",
        backgroundSize: "20px 20px",
      }}
    >
      <Container maxW={"6xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Sprints estimation <Text as="span">made easy with a </Text>
            <Text as={"span"} color={"dino.primary"}>
              easy to use planning poker tool
            </Text>
          </Heading>
          <Text
            color={"dino.base1"}
            maxW={"3xl"}
            fontSize={{ base: "2xl", sm: "lg", md: "xl" }}
          >
            We connect your team to a game like planning poker tool, making the
            estimation phase less boring and way less static.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Button
              colorScheme={"orange"}
              bg={"dino.primary"}
              onClick={() => handleCreate()}
            >
              Try planning poker free
            </Button>
            <Button bg="dino.secondary" onClick={() => handleJoin()}>
              Join a room
            </Button>
          </Stack>
          <Flex w={"full"}></Flex>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"dino.text"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("dino.secondary", "dino.primary")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Our goal
            </Text>
            <Heading>
              Boost Your Team's Agility with Our Planning Poker Tool
            </Heading>
            <Text color={"dino.base1"} fontSize={"lg"}>
              Streamline your project planning with our intuitive Planning Poker
              tool. Effortlessly estimate tasks, collaborate in real-time, and
              achieve more accurate sprint planning with ease.
            </Text>
          </Stack>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("dino.primary", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Users width={15} height={15} />}
              iconBg="green.400"
              text={"Real-Time Collaboration"}
            />
            <Feature
              icon={<BarChart width={15} height={15} />}
              iconBg="red.400"
              text="Customizable Estimation"
            />
            <Feature
              icon={<CheckCircle width={15} height={15} />}
              iconBg="yellow.400"
              text={"Team stack separation"}
            />
          </Stack>
        </SimpleGrid>
        <WithSpeechBubbles />
      </Container>
      <LargeWithLogoLeft />
    </div>
  );
};
