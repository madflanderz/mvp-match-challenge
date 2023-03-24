import { Box, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box px={7} mb={4}>
      <Link href="/projects" underline="none" variant="subtitle2">
        Terms & Conditions
      </Link>{" "}
      |{" "}
      <Link href="/projects" underline="none" variant="subtitle2">
        Privacy policy
      </Link>
    </Box>
  );
};
