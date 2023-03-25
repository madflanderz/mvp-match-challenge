import { Stack } from "@mui/material";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <Stack spacing={2} alignItems="center" py={4} px={4}>
      <Image src="/icons/menu_item_1.svg" alt="logo" width={27} height={40} />
      <Image src="/icons/menu_item_2.svg" alt="logo" width={27} height={40} />
      <Image src="/icons/menu_item_3.svg" alt="logo" width={27} height={40} />
      <Image src="/icons/menu_item_4.svg" alt="logo" width={27} height={40} />
      <Image src="/icons/menu_item_5.svg" alt="logo" width={27} height={40} />
    </Stack>
  );
};
