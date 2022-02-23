import { Box, Img } from "@chakra-ui/react";
import { character } from "../../components/atoms/character-card/hooks";
import { Input } from "../../components/atoms/input/input";
import { IOption } from "../../components/atoms/select/select";

interface IRound {
  character?: character;
  pointSystem?: IOption;
}

export const Round = ({ character, pointSystem }: IRound) => {
  return (
    <Box>
      <Img src={character?.src} />
      <Input value={pointSystem?.text} />
    </Box>
  );
};
