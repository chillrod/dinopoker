import { emitter } from "../emitter/emitter";
import { Events } from "../emitter/emitter-dto";

export const NotificationsService = {
  emitMessageBox({
    message,
    func,
    children,
    onClose,
  }: {
    message: string;
    func: keyof Events;
    children: React.ReactElement;
    onClose?: () => void | Promise<boolean>;
  }) {
    emitter.emit("EMIT_MESSAGEBOX", {
      message,
      func,
      children,
      onClose,
    });
  },

  emitMessageBoxLoading(value: boolean) {
    emitter.emit("EMIT_MESSAGEBOX_LOADING", value);
  },

  emitMessageBoxClose() {
    emitter.emit("EMIT_MESSAGEBOX_CLOSE", true);
  },

  emitToast({ message, state }: { message: string; state: string }) {
    emitter.emit("EMIT_TOAST", {
      message,
      state,
    });
  },

  emitScreenLoading({ show, message }: { show: boolean; message?: string }) {
    emitter.emit("EMIT_SCREENLOADING", { show, message });
  },

  emitConfirm({ func }: { func?: keyof Events }) {
    if (func) {
      return emitter.emit(func, "");
    }
  },
};
