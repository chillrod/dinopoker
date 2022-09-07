import { Box, Img, Text } from "@chakra-ui/react";

export const ButtonBox = ({
  text,
  image,
  secondary,
  onClick,
}: {
  text: string;
  image: string;
  secondary?: boolean;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <Box
      onClick={onClick}
      transition="200ms ease-in-out"
      _hover={{
        background: "dino.secondary",
      }}
      borderRadius="xl"
      as="button"
      w={["100%", "100%", '100%', 250]}
      h={["100%", "100%", 150, 200, 200]}
      bg={secondary ? "purple.900" : "purple.600"}
      p={6}
    >
      <Text mb={2} fontSize="xl" textAlign="start">
        {text}
      </Text>
      <Img src={image} w="80px" />
    </Box>
  );
};
