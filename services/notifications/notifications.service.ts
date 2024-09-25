import { DataSnapshot } from "firebase/database";

import { emitter } from "../emitter/emitter";
import { Events } from "../emitter/emitter-dto";

export const NotificationsService = {
  emitMessageBox({
    message,
    func,
    children,
    onClose,
    persistent,
  }: {
    message: string;
    func?: keyof Events;
    children: React.ReactElement;
    onClose?: () => void | Promise<boolean>;
    persistent?: boolean;
  }) {
    emitter.emit("EMIT_MESSAGEBOX", {
      message,
      func,
      children,
      onClose,
      persistent,
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

  emitBottomLoading({ show, message }: { show: boolean; message?: string }) {
    emitter.emit("EMIT_TOP_BOTTOM_LOADING", { show, message });
  },

  emitConfirm({ func }: { func?: keyof Events }) {
    if (func) {
      return emitter.emit(func, "");
    }
  },

  emitRoomState({
    hasPlayer,
    hasRoom,
    player,
  }: {
    hasPlayer: boolean;
    hasRoom: boolean;
    player?: DataSnapshot;
  }) {
    emitter.emit("EMIT_ROOM_STATE", {
      hasPlayer,
      hasRoom,
      player,
    });
  },
};
