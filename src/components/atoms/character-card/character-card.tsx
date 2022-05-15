import { Box, Button, Img } from "@chakra-ui/react";

import { CharacterList } from "../../../config/characters";

export type character = {
  id: number;
};

interface ICharacterCardProps {
  characterId?: number;
  disabled?: boolean;
  isSelected?: number;
  onClick?: React.MouseEventHandler;
}

export const CharacterCard = ({
  characterId = 0,
  disabled,
  isSelected,
  onClick,
}: ICharacterCardProps) => {
  const selectedProps = {
    border: "4px",
    borderStyle: "dotted",
    borderColor: "dino.primary",
  };

  const shadows = {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  };

  return (
    <Button
      _focus={{
        border: "4px",
        borderStyle: "dotted",
        borderColor: "dino.primary",
      }}
      {...shadows}
      borderRadius="full"
      outline="none"
      onClick={onClick}
      {...(isSelected === characterId ? selectedProps : {})}
      role="@dino-charactercard"
      disabled={disabled}
      size="lg"
      p={2}
      width={{
        sm: "5em",
        md: "5em",
        lg: "8em",
      }}
      height={{
        sm: "5em",
        md: "5em",
        lg: "8em",
      }}
    >
      <Box w="100%" h="100%">
        <Img
          role="@dino-characterimg"
          src={CharacterList[characterId].src}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>
    </Button>
  );
};
