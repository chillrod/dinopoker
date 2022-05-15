import { emitter } from "../emitter/emitter";
import { Events } from "../emitter/emitter-dto";

export const NotificationsService = {
  emitMessageBox({ message, func }: { message: string; func: keyof Events }) {
    emitter.emit("EMIT_MESSAGEBOX", {
      message,
      func,
    });
  },
};
