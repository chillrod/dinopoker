import React, { useCallback, useEffect } from "react";

import { Button, Img } from "@chakra-ui/react";

import { actionType, character } from "./hooks";

interface ICharacterCardProps {
  character: character;
  disabled?: boolean;
  isSelected?: number;
  onClick?: React.MouseEventHandler;
}

export const CharacterCard = ({
  character,
  disabled,
  isSelected,
  onClick,
}: ICharacterCardProps) => {
  const selectedProps = {
    border: "2px",
    borderStyle: "dotted",
    borderColor: "dino.primary",
  };

  return (
    <Button
      _focus={{
        borderWidth: '2px',
        borderColor: 'dino.primary',
      }}
      outline="none"
      onClick={onClick}
      {...(isSelected === character.id ? selectedProps : {})}
      role="@dino-charactercard"
      disabled={disabled}
      size="lg"
      width="8em"
      h="8em"
    >
      <Img src={character?.src || ""} w="100%" />
    </Button>
  );
};
