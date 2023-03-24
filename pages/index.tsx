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

      <Grid
        container
        spacing={2}
        alignItems="center"
        py={2}
        px={4}
        component="nav"
        borderBottom={2}
        borderColor="#F3F6F9"
      >
        <Grid item xs={1}>
          <Image src="/icons/b.svg" alt="logo" width={27} height={40} />
        </Grid>
        <Grid item xs={1}>
          <Image src="/icons/menu.svg" alt="logo" width={31} height={27} />
        </Grid>
        <Grid item xs={10} display="flex" justifyContent="flex-end">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={43}
              height={43}
              bgcolor="#F6CA65"
              borderRadius={2}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography variant="h5" color="white">
                JD
              </Typography>
            </Box>
            <Typography variant="h6">John Doe</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row">
        <Stack spacing={2} alignItems="center" py={2} px={4}>
          <Image
            src="/icons/menu_item_1.svg"
            alt="logo"
            width={27}
            height={40}
          />
          <Image
            src="/icons/menu_item_2.svg"
            alt="logo"
            width={27}
            height={40}
          />
          <Image
            src="/icons/menu_item_3.svg"
            alt="logo"
            width={27}
            height={40}
          />
          <Image
            src="/icons/menu_item_4.svg"
            alt="logo"
            width={27}
            height={40}
          />
          <Image
            src="/icons/menu_item_5.svg"
            alt="logo"
            width={27}
            height={40}
          />
        </Stack>
        <Box>
          <FilterMenu projects={props.projects} gateways={props.gateways} />
          <Box px={7} mb={4}>
            <Link href="/projects" underline="none" variant="subtitle2">
              Terms & Conditions
            </Link>{" "}
            |{" "}
            <Link href="/projects" underline="none" variant="subtitle2">
              Privacy policy
            </Link>
          </Box>
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
