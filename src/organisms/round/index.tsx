import { Box, Img } from "@chakra-ui/react";
import { character } from "../../components/atoms/character-card/hooks";

interface IRound {
  character?: character;
  pointSystem?: number[];
  name?: string;
}

export const Round = ({ character, pointSystem, name }: IRound) => {
  return (
    <Box>
      <Img src={character?.src} />
      {pointSystem?.map((point, id) => (
        <div key={id}>{point}</div>
      ))}
      <p>{name}</p>
    </Box>
  );
};
