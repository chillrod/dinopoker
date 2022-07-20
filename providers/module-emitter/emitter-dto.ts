export type Events = {
  //this is just for test
  ADD_COUNT: number;
  //

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
};
