import type { NextPage } from "next";

import Head from "next/head";
import HomeView from "../components/templates/_home";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>dinopoker - Online planningpoker for agile teams</title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Create a room and invite your team to join. Start planning your sprints and get feedback from your team."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
