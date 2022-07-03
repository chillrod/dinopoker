import { emitter } from "../emitter/emitter";
import { Events } from "../emitter/emitter-dto";

export const NotificationsService = {
  emitMessageBox({
    message,
    func,
    children,
  }: {
    message: string;
    func: keyof Events;
    children: React.ReactElement;
  }) {
    emitter.emit("EMIT_MESSAGEBOX", {
      message,
      func,
      children,
    });
  },

  emitMessageBoxLoading(value: boolean) {
    emitter.emit("EMIT_MESSAGEBOX_LOADING", value);
  },

  emitMessageBoxClose() {
    emitter.emit("EMIT_MESSAGEBOX_CLOSE", true);
  },

  emitToast(message: string) {
    emitter.emit("EMIT_TOAST", message);
  },

  emitConfirm({ func }: { func?: keyof Events }) {
    if (func) {
      return emitter.emit(func, "");
    }
  },
};
