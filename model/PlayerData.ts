export interface IPlayerData {
  raiseHand?: boolean;
  character?: number;
  id?: string;
  name?: string;
  vote?: number;
  room?: string;
  team?: PlayerDataTeam;
}

export enum PlayerDataTeam {
  FRONTEND = 1,
  BACKEND = 2,
  UNKNOWN = 3,
}
