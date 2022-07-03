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
  };

  EMIT_MESSAGEBOX_CLOSE: boolean;

  EMIT_MESSAGEBOX_LOADING: boolean;

  EMIT_TOAST: string;

  SET_JOIN_ROOM: () => void;
  SET_CREATE_ROOM: () => void;
};
