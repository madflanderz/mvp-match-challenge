import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";

const colors = {
  blue: "#005B96",
  green: "#1BC5BD",
  yellow: "#F6CA65",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.green,
    },
    text: {
      secondary: "#7E8299",
    },
  },
  components: {
    // Name of the component
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: colors.green,
          color: "white",
          border: "none",
        },
        icon: {
          color: "white",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.green,
          color: "white",
          border: "none",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        },
        input: {
          // padding: "8px 14px !important",
          // color: "yellow",
        },
      },
    },
  },
});
