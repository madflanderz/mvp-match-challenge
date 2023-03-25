import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export const Header = () => {
  return (
    <Stack
      direction="row"
      spacing={4}
      alignItems="center"
      py={2}
      px={4}
      component="nav"
      borderBottom={2}
      borderColor="#F3F6F9"
    >
      <Image src="/icons/b.svg" alt="logo" width={27} height={40} />

      <Image src="/icons/menu.svg" alt="logo" width={31} height={27} />

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        flex={1}
        justifyContent="flex-end"
      >
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
    </Stack>
  );
};
