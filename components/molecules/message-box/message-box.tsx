import { RefObject, useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  Box,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";

import { Button } from "../../atoms/button/button";

import { ModuleEmitter } from "../../../providers/module-emitter/emitter";

import { Events } from "../../../providers/module-emitter/emitter-dto";
import { NotificationsService } from "../../../providers/notifications/notifications.service";

interface FocusableElement {
  focus(options?: FocusOptions): void;
}

interface IMessageBox {
  open?: boolean;
}

export const MessageBox = ({ open = false }: IMessageBox) => {
  const { t } = useTranslation("common");

  const [isOpen, setIsOpen] = useState(open);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentFunc, setCurrentFunc] = useState<keyof Events>();
  const [userOnClose, setUserOnClose] = useState<() => void>();
  const [loading, setLoading] = useState(false);

  const [children, setCurrentChildren] = useState<React.ReactElement>();

  const cancelRef: RefObject<FocusableElement> = useRef(null);

  useEffect(() => {
    ModuleEmitter.on("EMIT_MESSAGEBOX", ({ message, func, children, onClose }) => {
      setIsOpen(true);

      setCurrentMessage(message);

      setCurrentFunc(func);

      setUserOnClose(() => onClose);

      setCurrentChildren(children);
    });

    ModuleEmitter.on("EMIT_MESSAGEBOX_LOADING", (data) => {
      setLoading(data);
    });

    ModuleEmitter.on("EMIT_MESSAGEBOX_CLOSE", () => {
      setIsOpen(false);
    });

    return () => {
      ModuleEmitter.off("EMIT_MESSAGEBOX");
      ModuleEmitter.off("EMIT_MESSAGEBOX_LOADING");
    };
  }, []);

  const handleActionConfirm = () => {
    if (currentFunc) {
      NotificationsService.emitConfirm({ func: currentFunc });
    }
  };

  return (
    <Box
      bg="dino.base5"
      {...(isOpen
        ? {
          opacity: "0.8",
          position: "absolute",
          h: "100%",
          w: "100%",
        }
        : {})}
    >
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogContent
          boxShadow="xl"
          role="@dino-dialogcontent"
          bg="dino.base3"
          p={12}
          px={6}
        >
          <AlertDialogBody>
            {children && <>{children}</>}
            {!children && (
              <Text
                textAlign="center"
                as="h2"
                color="dino.text"
                fontWeight={500}
              >
                {t("components.are-you-sure-you-want-to")}
                <br /> {currentMessage.length ? currentMessage : "ACTION"} ?
              </Text>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Grid gridTemplateColumns="1fr 1fr">
              <GridItem justifySelf="start">
                <Button
                  loading={loading}
                  bg="dino.secondary"
                  onClick={
                    userOnClose
                      ? () => [userOnClose(), setIsOpen(false)]
                      : () => setIsOpen(false)
                  }
                  forwardRef={cancelRef}
                >
                  {t("components.cancel")}
                </Button>
              </GridItem>
              <GridItem justifySelf="end">
                <Button
                  loading={loading}
                  onClick={() => handleActionConfirm()}
                  bg="dino.primary"
                >
                  {t("components.confirm")}
                </Button>
              </GridItem>
            </Grid>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
