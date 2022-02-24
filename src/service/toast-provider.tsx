import { useEffect } from "react";
import { emitToast } from "../components/atoms/toast/toast";
import { emitter } from "./emitter";

export const ToastProvider = () => {
  useEffect(() => {
    console.count();
    emitter.off("EMIT_TOAST");

    emitter.on("EMIT_TOAST", (message) => {
      emitToast({ message });
    });
  }, []);

  return <></>;
};
