import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "@/components/theme";
import { ThemeProvider } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Create a client
const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};
