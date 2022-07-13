import { useEffect } from "react";

import { emitToast } from "../components/atoms/message-toast/message-toast";
import { emitter } from "./emitter/emitter";

export const ToastProvider = () => {
  useEffect(() => {
    emitter.on("EMIT_TOAST", (data) => {
      emitToast({ message: data });
    });

    return () => {
      emitter.off("EMIT_TOAST");
    };
  }, []);

  return <></>;
};
