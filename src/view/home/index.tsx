import { ExternalLinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Home } from "./components";

export const HomeView = () => {
  return (
    <Box>
      <Box bg="gray.800" borderRadius="lg" mb={5}>
        <Flex p={2} justifyContent="space-between">
          <Tag size="lg" colorScheme="purple">
            dino poker
          </Tag>
          <Tag colorScheme="gray">
            <Tooltip label="Share room code">
              <Button mr={3} size="xs" rounded="full">
                <ExternalLinkIcon />
              </Button>
            </Tooltip>
            <Tooltip label="Light Mode">
              <Button mr={3} size="xs" rounded="full">
                <SunIcon />
              </Button>
            </Tooltip>
            <Text mr={2}>room code: </Text>
            <Tag colorScheme="gray">KHGGLS</Tag>
          </Tag>
        </Flex>
      </Box>
      <Container maxW="container.md">
        <Home />
      </Container>
    </Box>
  );
};
