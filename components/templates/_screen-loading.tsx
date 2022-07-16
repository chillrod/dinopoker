import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "react-feather";
import { PlainTemplate } from "./_plain-template";

const ScreenLoading = ({ action }: { action?: string }) => {
  return (
    <Box position="absolute" w="100%" h="100%">
      <PlainTemplate cols="1fr" areas="1fr" rows="auto auto">
        <GridItem justifySelf="center">
          <Heading fontWeight={600} fontSize={"2em"}>
            {action ? action : ""}{" "}
          </Heading>
        </GridItem>
        <GridItem justifySelf="center" alignSelf="start">
          <Spinner />
        </GridItem>
        <GridItem justifySelf="center">
          <Flex>
            <Info />
            <Text textAlign="center" ml={2}>
              You can invite people by just copying the Game URL
            </Text>
          </Flex>
        </GridItem>
      </PlainTemplate>
    </Box>
  );
};

export default ScreenLoading;
