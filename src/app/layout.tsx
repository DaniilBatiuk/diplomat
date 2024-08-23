import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/assets/styles/globals.scss";
import { Footer, Header } from "@/components";
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
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </>
  );
}
