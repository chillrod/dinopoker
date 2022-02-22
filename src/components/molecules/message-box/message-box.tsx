import React from "react";
import { Children, useEffect, useState, useRef } from "react";

import { Flex, AlertDialog, Button } from "@chakra-ui/react";

interface ImessageBoxProps {
  isOpen: boolean;
  onClose: () => boolean;
  children: React.ReactNode;
}

const cancelRef = React.useRef();

export const MessageBox = ({ children, isOpen, onClose }: ImessageBoxProps) => {
  return (
    <>
      <Flex>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          {children}
          <Button onClick={() => action.fn()} action={action}>
            Cancel
          </Button>
          <Button onClick={() => action.fn()} action={action}>
            Confirm
          </Button>
        </AlertDialog>
      </Flex>
    </>
  );
};
