import Head from "next/head";

import Poker from "../../components/templates/_poker";
import { Poker2 } from "../../components/templates/_poker2";

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
      <Poker2 />
      {/* <Poker /> */}
    </>
  );
};

export default GameRoom;
