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
  base5: "#111111",
  text: "#DDDDDD",
};

const ChakraTheme = extendTheme({
  config,
  colors: {
    dino,
  },
  styles: {
    global: () => ({
      body: {
        h: '100vh',
        bg: '#191719',
        backgroundImage: "linear-gradient(to top, #2d05712e 0%, #191719 100%);",
      },
    }),
  },
});

export default ChakraTheme;
