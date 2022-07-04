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

import { emitter } from "../../../services/emitter/emitter";

import { Events } from "../../../services/emitter/emitter-dto";
import { NotificationsService } from "../../../services/notifications/notifications.service";

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
  const [currentFunc, setCurrentFunc] = useState<keyof Events>();
  const [loading, setLoading] = useState(false);

  const [children, setCurrentChildren] = useState<React.ReactElement>();

  const onClose = () => setIsOpen(false);

  const cancelRef: RefObject<FocusableElement> = useRef(null);

  useEffect(() => {
    emitter.on("EMIT_MESSAGEBOX", ({ message, func, children }) => {
      setIsOpen(true);

      setCurrentMessage(message);

      setCurrentFunc(func);

      setCurrentChildren(children);
    });

    emitter.on("EMIT_MESSAGEBOX_LOADING", (data) => {
      setLoading(data);
    });

    emitter.on("EMIT_MESSAGEBOX_CLOSE", () => {
      setIsOpen(false);
    });

    return () => {
      emitter.off("EMIT_MESSAGEBOX");
      emitter.off("EMIT_MESSAGEBOX_LOADING");
    };
  }, []);

  const handleActionConfirm = () => {
    if (currentFunc) {
      NotificationsService.emitConfirm({ func: currentFunc });
    }
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
          {children && <>{children}</>}
          {!children && (
            <Text textAlign="center" as="h2" color="dino.text" fontWeight={500}>
              {t("components.are-you-sure-you-want-to")}
              <br /> {currentMessage.length ? currentMessage : "ACTION"} ?
            </Text>
          )}
        </AlertDialogBody>
        <AlertDialogFooter justifyContent="center">
          <Flex gap={2} justifyContent="center">
            {process.env.NODE_ENV !== "test" && (
              <Button
                loading={loading}
                bg="dino.secondary"
                onClick={onClose}
                forwardRef={cancelRef}
              >
                {t("components.cancel")}
              </Button>
            )}
            <Button
              loading={loading}
              onClick={() => handleActionConfirm()}
              bg="dino.primary"
            >
              {t("components.confirm")}
            </Button>
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
