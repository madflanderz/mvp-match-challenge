import "@/styles/global.css";
import type { AppProps } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "@/components/theme";
import { ThemeProvider } from "@mui/material";

// Create a client
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
