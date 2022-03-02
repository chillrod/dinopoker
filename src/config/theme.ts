import { extendTheme, ThemeConfig } from "@chakra-ui/react";

export const config: ThemeConfig = {
  initialColorMode: "dark",
};

export const dino = {
  primary: "#7755CC",
  secondary: "#333333",
  base1: "#777777",
  base2: "#555555",
  base3: "#212121",
  base4: "#2B2B2B",
  text: "#DDDDDD",
};

const ChakraTheme = extendTheme({
  config,
  colors: {
    dino,
  },
});

export default ChakraTheme;
