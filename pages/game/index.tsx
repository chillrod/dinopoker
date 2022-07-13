import Head from "next/head";

import { DinoPoker } from "../../components/atoms/dinopoker";

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
      <DinoPoker />
    </>
  );
};

export default GameRoom;
