import { RefObject, useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  Flex,
  Text,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import { Button } from "../../atoms/button/button";

import { emitter } from "../../../service/emitter/emitter";

import { Events } from "../../../service/emitter/emitter-dto";

interface FocusableElement {
  focus(options?: FocusOptions): void;
}

interface IMessageBox {
  open?: boolean;
}

export const MessageBox = ({ open = false }: IMessageBox) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(open);

  const [currentMessage, setCurrentMessage] = useState("");

  const [currentFunc, setCurrentFunc] = useState<keyof Events>("SUCCESS");

  const onClose = () => setIsOpen(false);

  const cancelRef: RefObject<FocusableElement> = useRef(null);

  useEffect(() => {
    emitter.on("EMIT_MESSAGEBOX", ({ message, func }) => {
      setIsOpen(true);

      setCurrentFunc(func);

      setCurrentMessage(message);
    });
  }, []);

  const handleActionConfirm = () => {
    if (currentFunc) {
      emitter.emit(currentFunc);
    }

    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogContent
        boxShadow="xl"
        role="@dino-dialogcontent"
        bg="dino.base4"
        borderRadius="lg"
        p={2}
        px={8}
        maxWidth="fit-content"
      >
        <AlertDialogBody>
          <Text textAlign="center" as="h2" color="dino.text" fontWeight={500}>
            {t("components.are-you-sure-you-want-to")}
            <br /> {currentMessage.length ? currentMessage : "ACTION"} ?
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter justifyContent="center">
          <Flex gap={2} justifyContent="center">
            {process.env.NODE_ENV !== "test" && (
              <Button onClick={onClose} ref={cancelRef}>
                {t("components.cancel-action")}
              </Button>
            )}
            <Button onClick={() => handleActionConfirm()} action="confirm">
              {t("components.confirm-action")}
            </Button>
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
