import { Box, createStandaloneToast, SimpleGrid, Text } from "@chakra-ui/react";

import theme from "../../../config/theme";

const toast = createStandaloneToast({ theme: theme });

//TODO - Make button of closable toast

export const emitToast = ({ message }: { message: string }) =>
  toast({
    position: "top-right",
    render: () => (
      <SimpleGrid bg="dino.secondary" borderRadius="md" p={2}>
        <Box p={2.5}>
          <Text as="span">{message}</Text>
        </Box>
        <Box width="100%" height="3px" bg="dino.primary"></Box>
      </SimpleGrid>
    ),
    duration: 3000,
    status: "success",
  });
