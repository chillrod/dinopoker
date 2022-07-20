import { CharacterList } from "../../interface/characters";
import { IPlayerData, PlayerDataTeam } from "../../interface/PlayerData";
import { emitter } from "../../../../providers/emitter/emitter";

export const PlayerService = {
  getRandomPlayer() {
    const randomPlayer =
      CharacterList[Math.floor(Math.random() * CharacterList.length)];

    return randomPlayer.id;
  },
  PLAYER_NAME(name: string) {
    emitter.emit("PLAYER_NAME", name);
  },

  PLAYER_CHARACTER(characterId: number) {
    emitter.emit("PLAYER_CHARACTER", characterId);
  },

  preparePlayer(playerData: IPlayerData) {
    const preparedPlayer: IPlayerData = {
      ...playerData,
      character: PlayerService.getRandomPlayer(),
      raiseHand: false,
      vote: 0,
      team: PlayerDataTeam.UNKNOWN,
    };

    return {
      ...preparedPlayer,
    };
  },
};
