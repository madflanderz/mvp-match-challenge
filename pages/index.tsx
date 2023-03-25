import Head from "next/head";
import Image from "next/image";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { FilterMenu } from "@/components/FilterMenu";
import { FC } from "react";
import { NextPage } from "next";
import { Project } from "types/Project";
import { Gateway } from "types/Gateway";
import { ReportGenerator } from "@/components/ReportGenerator";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Props {
  projects: Project[];
  gateways: Gateway[];
}

const Home: NextPage<Props> = (props) => {
  // console.log(props);

  return (
    <div>
      <Head>
        <title>MVP Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Stack direction="row">
        <Sidebar />
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          pr={4}
        >
          <ReportGenerator
            projects={props.projects}
            gateways={props.gateways}
          />
          <Footer />
        </Box>
      </Stack>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  const res = await fetch(process.env.API_PATH + "projects");
  const json = await res.json();
  console.log(json);

  const resGateways = await fetch(process.env.API_PATH + "gateways");
  const jsonGateways = await resGateways.json();
  console.log(jsonGateways);

  return { projects: json.data, gateways: jsonGateways.data };
};

export default Home;
