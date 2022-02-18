import { Box, Input, Text } from "@chakra-ui/react";

export const Form: React.FC = () => {
  return (
    <Box>
      <Text my={1} fontSize="sm" fontWeight={700}>
        Name *
      </Text>
      <Input my={1} variant="filled" bg="purple.900" placeholder="type here" />
      <Text my={1} fontSize="sm" fontWeight={700}>
        Join Room?
      </Text>
      <Input my={1} variant="filled" bg="purple.900" placeholder="type code" />
    </Box>
  );
};
