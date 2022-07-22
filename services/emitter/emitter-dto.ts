export type Events = {
  //this is just for test
  ADD_COUNT: number;
  //

  PLAYER_NAME: string;
  PLAYER_CHARACTER: number;

  EMIT_MESSAGEBOX: {
    message: string;
    func: keyof Events;
    children?: React.ReactElement;
    onClose?: () => void;
  };

  EMIT_MESSAGEBOX_CLOSE: boolean;

  EMIT_MESSAGEBOX_LOADING: boolean;

  EMIT_TOAST: { message: string; state: string };

  EMIT_SCREENLOADING: { show: boolean; message?: string };
  EMIT_TOP_BOTTOM_LOADING: { show: boolean; message?: string };

  SET_JOIN_ROOM: () => void;
  SET_CREATE_ROOM: () => void;

  EMIT_INVALID_ROOM_STATE: {
    hasRoom: boolean;
    hasPlayer: boolean;
  };
};
