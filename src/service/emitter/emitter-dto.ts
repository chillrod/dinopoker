import { character } from "../../components/atoms/character-card/hooks";
import { IOption } from "../../components/atoms/select/select";

export type Events = {
  //this is just for test
  ADD_COUNT: number;
  //

  CHARACTER_NAME: string;
  SELECTED_CHARACTER?: character;
  SELECTED_CONFIGURATION?: IOption;

  CREATE_ROOM: { name?: string; pointSystem?: number[]; character?: character };

  CHANGE_ROOM_CONFIG: { point: string; rounds: number };

  JOIN_ROOM: {
    room?: string;
    id?: string;
    character: { id: number };
    vote?: number;
    name?: string;
  };

  DISCONNECT: () => void;
  LEAVE: () => void;
  SHARE: () => void;

  CONFIRM_ACTION: () => void;
  CANCEL_ACTION: () => void;
  EMIT_TOAST: string;
  EMIT_CHARACTER_TOAST: { message: string; characterSrc?: string };
  EMIT_MESSAGEBOX: string;
  EMIT_CHATMESSAGE: string;

  ERROR: string;
  SUCCESS: string;
  LOADING: boolean;

  VOTE_START: () => void;
  VOTE_SELECT: (point: number) => void;
  VOTE_REVEAL: () => void;
  VOTE_END: () => void;
};
