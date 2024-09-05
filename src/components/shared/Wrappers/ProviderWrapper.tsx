"use client";

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

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider> <ToastContainer />
      <NextTopLoader />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
