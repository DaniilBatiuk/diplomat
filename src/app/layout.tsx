import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/assets/styles/globals.scss";
import { Footer, Header, ProviderWrapper } from "@/components";
import { WEB_NAME } from "@/utils/constants";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: WEB_NAME,
    template: `%s | ${WEB_NAME}`,
  },
  description: "Diplomat - gift shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <div className="wrapper" id="wrapper">
            <ProviderWrapper>
              <Header />
              <main>
                {children} <ToastContainer />
              </main>
              <Footer />
            </ProviderWrapper>
          </div>
        </body>
      </html>
    </>
  );
}
