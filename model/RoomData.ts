import { IVoteSystem } from "../config/vote-system/vote-system";
import { IPlayerData } from "./PlayerData";

export interface IRoomData {
  id?: string;
  players?: IPlayerData[];
  status?: RoomDataStatus;
  voteSystem: string;
}

export enum RoomDataStatus {
  PENDING = 1,
  REVEALED = 2,
  NOTE_REVEALED = 3,
}
