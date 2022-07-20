import { useEffect } from "react";

import { emitToast } from "../components/atoms/message-toast/message-toast";
import { ModuleEmitter } from "./module-emitter/emitter";

export const ToastProvider = () => {
  useEffect(() => {
    ModuleEmitter.on("EMIT_TOAST", ({ message, state }) => {
      emitToast({ message, state });
    });

    return () => {
      ModuleEmitter.off("EMIT_TOAST");
    };
  }, []);

  return <></>;
};
