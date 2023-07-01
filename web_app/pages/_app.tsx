import type { AppProps } from "next/app";


import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
