import mitt, { Emitter } from "mitt";
import { character } from "../components/atoms/character-card/hooks";
import { IOption } from "../components/atoms/select/select";

export type Events = {
  //this is just for test
  ADD_COUNT: number;
  //

  CREATE_ROOM: {
    character?: character;
    pointSystem?: IOption;
  };

  CHANGE_ROOM_CONFIG: { point: string; rounds: number };
  JOIN_ROOM: () => void;
  DISCONNECT: () => void;
  LEAVE: () => void;
  SHARE: () => void;

  CONFIRM_ACTION: () => void;
  CANCEL_ACTION: () => void;
  EMIT_TOAST: (message: string) => void;

  ERROR: string;
  SUCCESS: string;
  LOADING: boolean;

  EMIT_MESSAGEBOX: (message: string) => void;

  VOTE_START: () => void;
  VOTE_SELECT: (point: number) => void;
  VOTE_REVEAL: () => void;
  VOTE_END: () => void;
};

export const emitter: Emitter<Events> = mitt<Events>();
