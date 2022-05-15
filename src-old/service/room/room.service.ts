import { IOption } from "../../components/atoms/select/select";
import { emitter } from "../emitter/emitter";

export const RoomService = {
  setSelectedConfiguration(option?: IOption) {
    emitter.emit("SELECTED_CONFIGURATION", option);
  },

  setRevealVote(message: string) {
    emitter.emit("REVEAL_VOTE", message);
  },

  setRestartAction(message: string) {
    emitter.emit("RESTART_ACTION", message);
  },
};
