import { useEffect } from "react";

import { emitCharacterToast } from "../components/atoms/character-toast/character-toast";
import { emitToast } from "../components/atoms/message-toast/message-toast";
import { emitter } from "./emitter/emitter";
import { socket } from "./socket";

export const ToastProvider = () => {
  // useEffect(() => {
  //   emitter.on("EMIT_CHARACTER_TOAST", (data) => {
  //     const { message, characterSrc } = data;
  //     emitCharacterToast({ message, characterSrc });
  //   });

  //   emitter.off("EMIT_CHARACTER_TOAST");
  // }, []);

  useEffect(() => {
    emitter.on("EMIT_TOAST", (data) => {
      emitToast({ message: data });
    });
  }, []);

  return <></>;
};
