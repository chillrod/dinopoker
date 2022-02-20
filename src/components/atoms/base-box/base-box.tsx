import { Box } from "@chakra-ui/react";

interface IBaseBox {
  children?: React.ReactNode;
}

export const BaseBox = ({ children }: IBaseBox) => {
  return (
    <Box p={1} bg="dino.secondary" borderRadius="md">
      {children}
    </Box>
  );
};
