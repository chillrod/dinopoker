import {
  Container,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { WheelOrganize } from "../molecules/wheel-organize/wheel-organize";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WheelPlay } from "../molecules/wheel-play/wheel-play";

const WheelTemplate = () => {
  const [wheelMembers, setWheelMembers] = useState<string[]>([]);
  const [hasWheelMembers, setHasWheelMembers] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { query } = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (query.members) {
      const members = query.members as string;

      setHasWheelMembers(true);

      setWheelMembers(members.split(","));
    }
  }, [query]);

  return (
    <div
      style={{
        opacity: 0.8,
        backgroundImage: "radial-gradient(#412f6e 0.5px, #111111 0.5px)",
        backgroundSize: "20px 20px",
      }}
    >
      <Container maxW={"6xl"}>
        {!isLoading ? (
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{
              base: hasWheelMembers ? 0 : 20,
              md: hasWheelMembers ? 0 : 28,
            }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              {hasWheelMembers ? "" : "Organize your standup meetings with the"}

              <Text as="span"> {hasWheelMembers ? "" : ", daily wheel "} </Text>
              <Text as={"span"} color={"dino.primary"} mr={2}>
                {hasWheelMembers ? "" : "to randomly select a team member"}
              </Text>
            </Heading>
            {hasWheelMembers ? (
              <WheelPlay members={wheelMembers} />
            ) : (
              <WheelOrganize />
            )}
          </Stack>
        ) : (
          <Grid placeItems="center" h="60vh">
            <GridItem>
              <Spinner />
            </GridItem>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default WheelTemplate;
