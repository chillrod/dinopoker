import { IPlayerData } from "./PlayerData";

export interface IRoomData {
  id: string;
  status: string;
  players: IPlayerData[];
  voteSystem: string;
}
