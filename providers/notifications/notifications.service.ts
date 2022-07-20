import { ModuleEmitter } from "../module-emitter/emitter";
import { Events } from "../module-emitter/emitter-dto";

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
    ModuleEmitter.emit("EMIT_MESSAGEBOX", {
      message,
      func,
      children,
      onClose,
    });
  },

  emitMessageBoxLoading(value: boolean) {
    ModuleEmitter.emit("EMIT_MESSAGEBOX_LOADING", value);
  },

  emitMessageBoxClose() {
    ModuleEmitter.emit("EMIT_MESSAGEBOX_CLOSE", true);
  },

  emitToast({ message, state }: { message: string; state: string }) {
    ModuleEmitter.emit("EMIT_TOAST", {
      message,
      state,
    });
  },

  emitScreenLoading({ show, message }: { show: boolean; message?: string }) {
    ModuleEmitter.emit("EMIT_SCREENLOADING", { show, message });
  },

  emitConfirm({ func }: { func?: keyof Events }) {
    if (func) {
      return ModuleEmitter.emit(func, true);
    }
  },
};
