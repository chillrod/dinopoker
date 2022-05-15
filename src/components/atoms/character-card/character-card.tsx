import { Box, Button, Img } from "@chakra-ui/react";

import { character } from "./hooks";

interface ICharacterCardProps {
  character?: character;
  disabled?: boolean;
  isSelected?: number;
  onClick?: React.MouseEventHandler;
  isSelectedScreen?: boolean;
}

export const CharacterCard = ({
  character,
  disabled,
  isSelected,
  onClick,
  isSelectedScreen,
}: ICharacterCardProps) => {
  const selectedProps = {
    border: "4px",
    borderStyle: "dotted",
    borderColor: "dino.primary",
  };

  return (
    <Button
      _focus={{
        borderWidth: "2px",
        borderColor: "dino.primary",
      }}
      borderRadius="xl"
      outline="none"
      onClick={onClick}
      bg={(isSelectedScreen && "dino.primary") || "dino.secondary"}
      {...(isSelected === character?.id ? selectedProps : {})}
      role="@dino-charactercard"
      disabled={disabled}
      size="lg"
      p={6}
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
          src={character?.src || ""}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>
    </Button>
  );
};
