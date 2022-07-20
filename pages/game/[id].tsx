import Head from "next/head";

import { Poker } from "../../domain/dino-poker/views/_poker2";

const GameRoom = () => {
  return (
    <>
      <Head>
        <title>
          Online game room! create a new room to play with your team
        </title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Create a room and invite your team to join. Start planning your sprints and get feedback from your team."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Poker />
    </>
  );
};

export default GameRoom;
