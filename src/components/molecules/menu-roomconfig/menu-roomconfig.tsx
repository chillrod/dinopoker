import { SettingsIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

import { Button } from "../../atoms/button/button";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { InputNumber } from "../../atoms/input-number/input-number";
import { Input } from "../../atoms/input/input";
import { Select } from "../../atoms/select/select";

import { pointSystem } from "../room-config/pointSystem";

export const MenuRoomConfig = () => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <IconButton
          color="dino.base1"
          ariaLabel="Room Settings"
          icon={<SettingsIcon />}
        />
      </PopoverTrigger>
      <PopoverContent
        maxW="15em"
        p={2}
        bg="dino.base4"
        borderRadius="md"
        outline="none"
        border="none"
      >
        <PopoverHeader border="none">
          <Grid alignItems="center">
            <Text color="dino.text" fontWeight={600}>
              Configuration
            </Text>
            <PopoverCloseButton
              bg="dino.base2"
              borderRadius="full"
              color="dino.text"
            />
          </Grid>
        </PopoverHeader>
        <PopoverBody>
          <FormControl>
            <Grid gap={3}>
              <GridItem>
                <FormLabel>Point system</FormLabel>
                <Select options={pointSystem} />
              </GridItem>
              <GridItem>
                <FormLabel>Rounds</FormLabel>
                <InputNumber value={3} />
              </GridItem>
            </Grid>
          </FormControl>
        </PopoverBody>
        <PopoverFooter border="none">
          <Grid width="100%">
            <Button action="confirm">Save</Button>
          </Grid>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
