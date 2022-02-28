import {
  CopyIcon,
  InfoIcon,
  LinkIcon,
  RepeatIcon,
  SettingsIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Stack, Tooltip, Box, Flex } from "@chakra-ui/react";
import { BaseBox } from "../../atoms/base-box/base-box";
import { DinoPoker } from "../../atoms/dinopoker";
import { IconButton } from "../../atoms/icon-button/icon-button";

export const Menu = () => {
  return (
    <>
      <BaseBox>
        <Flex flexDirection="column">
          <Tooltip label="Share">
            <span>
              <IconButton ariaLabel="share" icon={<LinkIcon />}></IconButton>
            </span>
          </Tooltip>
          <Tooltip label="Configurations">
            <span>
              <IconButton
                ariaLabel="configurations"
                icon={<SettingsIcon />}
              ></IconButton>
            </span>
          </Tooltip>
          <Tooltip label="restart">
            <span>
              <IconButton
                ariaLabel="restart"
                icon={<RepeatIcon />}
              ></IconButton>
            </span>
          </Tooltip>
          <Tooltip label="close">
            <span>
              <IconButton
                ariaLabel="close"
                icon={<SmallCloseIcon />}
              ></IconButton>
            </span>
          </Tooltip>

          <Box p={0} m={0} transform="rotate(90deg)">
            <DinoPoker />
          </Box>
        </Flex>
      </BaseBox>
    </>
  );
};
