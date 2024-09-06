"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

export const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  // const pathname = usePathname();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  const theme = createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "1px solid rgb(234, 171, 83)",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "1px solid rgb(234, 171, 83)",
            },
            "&:after": {
              borderBottom: "2px solid rgb(234, 171, 83)",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider> <ToastContainer />
        <NextTopLoader />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
