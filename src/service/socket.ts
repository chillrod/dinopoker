import { io } from "socket.io-client";

// export const socket = io(
//   "https://dino-poker-server.herokuapp.com/dinoapp-games"
// );

export const socket = io("http://localhost:3333/dinoapp-games");
