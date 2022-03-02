import { useEffect } from "react";
import { emitCharacterToast } from "../components/atoms/character-toast/character-toast";
import { emitToast } from "../components/atoms/message-toast/message-toast";
import { emitter } from "./emitter/emitter";

export const ToastProvider = () => {
  useEffect(() => {
    emitter.off("EMIT_CHARACTER_TOAST");

    emitter.on("EMIT_CHARACTER_TOAST", (data) => {
      const { message, characterSrc } = data;
      emitCharacterToast({ message, characterSrc });
    });
  }, []);

  useEffect(() => {
    emitter.off("EMIT_TOAST");

    emitter.on("EMIT_TOAST", (message) => {
      emitToast({ message });
    });
  }, []);

  return <></>;
};
