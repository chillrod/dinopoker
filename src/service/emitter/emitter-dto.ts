import { character } from "../../components/atoms/character-card/hooks";
import { IOption } from "../../components/atoms/select/select";
import { IPlayerData } from "../../components/organisms/dto/playerdata";

export type Events = {
  //this is just for test
  ADD_COUNT: number;
  //

  CHARACTER_NAME: string;
  SELECTED_CHARACTER?: character;
  SELECTED_CONFIGURATION?: IOption;

  CREATE_ROOM: { name?: string; pointSystem?: number[]; character?: character };

  ROOM_PLAYERS: IPlayerData[];

  CURRENT_PLAYER: IPlayerData;

  CHANGE_VOTE: number;
  RESTART_ACTION: string;
  RESET_ACTION: string;
  LEAVE_ACTION: string;

  REVEAL_VOTE: string;

  CHANGE_ROOM_CONFIG: { point: string; rounds: number };

  DISCONNECT: () => void;
  LEAVE: () => void;
  SHARE: () => void;

  CONFIRM_ACTION: () => void;
  CANCEL_ACTION: () => void;
  EMIT_TOAST: string;
  EMIT_CHARACTER_TOAST: { message: string; characterSrc?: string };
  EMIT_MESSAGEBOX: { message: string; func: keyof Events };
  EMIT_CHATMESSAGE: string;

  ERROR: string;
  SUCCESS: string;
  LOADING: boolean;
};
