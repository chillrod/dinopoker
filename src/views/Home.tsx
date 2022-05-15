import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { Button } from "../components/atoms/button/button";
import { Input } from "../components/atoms/input/input";
import { Nav } from "../components/molecules/nav/nav";
import { SelectCharacter } from "../components/molecules/select-character/select-character";
import { emitter } from "../services/emitter/emitter";
import { IPlayerData, PlayerService } from "../services/player/player.service";

export const Home = () => {
  const { t } = useTranslation();

  const [playerData, setPlayerData] = useState<IPlayerData>({});

  useEffect(() => {
    emitter.on("PLAYER_CHARACTER", (data) => {
      setPlayerData((playerData) => ({ ...playerData, character: data }));
    });

    emitter.on("PLAYER_NAME", (data) => {
      setPlayerData((playerData) => ({ ...playerData, name: data }));
    });
  }, []);

  return (
    <Container as="section" maxW="container.lg">
      <Grid templateRows="1fr 1fr 2fr" gap={6} justifyContent="center">
        <GridItem alignSelf="center" gridRow={1}>
          <Nav />
        </GridItem>
        <GridItem alignSelf="center" gridRow={2}>
          <Heading fontWeight={400} textAlign="center" size="lg">
            {t("home.select-your-avatar-and-join-or-create-a-room")}
          </Heading>
        </GridItem>
        <GridItem alignSelf="center" justifySelf="center">
          <SelectCharacter />
        </GridItem>
        <GridItem alignSelf="center">
          <Grid gap={6}>
            <Box w="50%" margin="0 auto">
              <Input
                onChange={(event) =>
                  PlayerService.PLAYER_NAME(event.target.value)
                }
                placeholder={t("home.type-your-name")}
              />
            </Box>
            <Text fontSize="md" textAlign="center">
              {t("home.select-gameplay-option")}
            </Text>
            <Flex justifyContent="center" gap={3}>
              <Box justifySelf="center">
                <Button>{t("home.create-a-room")}</Button>
              </Box>
              <Box justifySelf="center">
                <Button
                  onClick={() => console.log(playerData)}
                  bg="dino.secondary"
                >
                  {t("home.or-join-a-room")}
                </Button>
              </Box>
            </Flex>
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
};
