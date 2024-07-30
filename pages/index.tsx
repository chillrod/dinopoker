import type { NextPage } from "next";

import Head from "next/head";
import { Landing } from "../components/templates/_landing";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>dinoplanningpoker - Online sprint estimation for agile teams</title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Create a room and invite your team to join. Start planning your sprints and get feedback from your team."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  );
};

export default Home;
