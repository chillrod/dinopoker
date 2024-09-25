import type { NextPage } from "next";
import Head from "next/head";
import WheelTemplate from "../../components/templates/_wheel";
import { useRouter } from "next/router";

const WheelMembers: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <>
      <Head>
        <title>
          dinoplanningpoker - Online sprint estimation for agile teams
        </title>
        <link rel="canonical" href="/wheel" />
        <meta
          name="description"
          content="Daily wheel to randomly select a team member to organize standup meetings"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {JSON.stringify(id)}

      {/* <WheelTemplate /> */}
    </>
  );
};

export default WheelMembers;
