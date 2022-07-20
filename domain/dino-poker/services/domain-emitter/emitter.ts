import mitt, { Emitter } from "mitt";
import { Events } from "./emitter-dto";

export const DinoPokerEmitter: Emitter<Events> = mitt<Events>();
