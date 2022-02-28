import { Tooltip, Box, Flex, Text, Grid } from "@chakra-ui/react";

import { BaseBox } from "../../atoms/base-box/base-box";
import { IconButton } from "../../atoms/icon-button/icon-button";

export interface IMenu {
  menuItems: {
    icon: React.ReactElement;
    label: string;
  }[];
}

export const Menu = ({ menuItems }: IMenu) => {
  return (
    <>
      <BaseBox>
        <Grid templateRows="1fr 1fr">
          <Flex flexDirection="column" gap={2}>
            {menuItems.map(({ label, icon }) => (
              <Tooltip label={label}>
                <span>
                  <IconButton
                    color="dino.base1"
                    onClick={() => console.log("TODO")}
                    ariaLabel={label}
                    icon={icon}
                  />
                </span>
              </Tooltip>
            ))}
          </Flex>
          <Box p={0} m={0} justifySelf="center" alignSelf="end">
            <Text
              fontSize="xl"
              sx={{
                writingMode: "vertical-lr",
                textOrientation: "mixed",
              }}
            >
              Dino
              <Text
                fontWeight={800}
                as="span"
                sx={{
                  color: "dino.primary",
                }}
              >
                poker
              </Text>
            </Text>
          </Box>
        </Grid>
      </BaseBox>
    </>
  );
};
