import mitt, { Emitter } from "mitt";
import { Events } from "./emitter-dto";

export const ModuleEmitter: Emitter<Events> = mitt<Events>();
