import { CharacterList } from "../../interface/characters";
import { IPlayerData, PlayerDataTeam } from "../../interface/PlayerData";

export const PlayerService = {
  getRandomPlayer() {
    const randomPlayer =
      CharacterList[Math.floor(Math.random() * CharacterList.length)];

    return randomPlayer.id;
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
