import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { InputIcon } from "../components/atoms/input-icon/input-icon";
import { Input } from "../components/atoms/input/input";

// const socket = io("http://localhost:8080");

interface Message {
  id: string;
  body: string;
  client: string;
}

export const Playground = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //   socket.on("dino-app", (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  // useEffect(() => {
  //   socket.connect();

  //   socket.on("connected", (messages) => {
  //     setMessages(messages);
  //   });
  // }, []);

  // const emitMessage = (message: string) => {
  //   socket.emit("dino-app", message);
  // };

  return (
    <div>
      {/* <InputIcon confirm={(e) => emitMessage(e)} ariaLabel="hello" /> */}

      {messages.map((message) => (
        <h2>{message.body}</h2>
      ))}
    </div>
  );
};
