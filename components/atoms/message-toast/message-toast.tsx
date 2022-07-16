import { Box, createStandaloneToast, SimpleGrid, Text } from "@chakra-ui/react";

import theme from "../../../config/theme/theme";

const { toast } = createStandaloneToast({ theme: theme });

export const emitToast = ({
  message,
  state,
}: {
  message: string;
  state: string;
}) =>
  toast({
    position: "top-right",
    render: () => (
      <SimpleGrid
        bg={state === "error" ? "red.600" : "green.500"}
        borderRadius="md"
        p={2}
      >
        <Box p={2.5}>
          <Text as="span">{message}</Text>
        </Box>
      </SimpleGrid>
    ),
    duration: 2000,
    status: "success",
  });
