import { IPlayerData, PlayerDataTeam } from "../../model/PlayerData";
import { emitter } from "../emitter/emitter";

export const PlayerService = {
  PLAYER_NAME(name: string) {
    emitter.emit("PLAYER_NAME", name);
  },

  PLAYER_CHARACTER(characterId: number) {
    emitter.emit("PLAYER_CHARACTER", characterId);
  },

  SET_SPECTATOR(spectator: boolean) {
    emitter.emit("SET_SPECTATOR", spectator);
  },

  preparePlayer(playerData: IPlayerData) {
    const preparedPlayer: IPlayerData = {
      ...playerData,
      raiseHand: false,
      vote: 0,
      team: PlayerDataTeam.UNKNOWN,
    };

    return {
      ...preparedPlayer,
    };
  },
};
