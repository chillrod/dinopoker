import mitt, { Emitter } from "mitt";
import { Events } from "./emitter-dto";

export const emitter: Emitter<Events> = mitt<Events>();
