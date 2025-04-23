import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QsysProvider from "@/context/QsysProvider";
// import ConnectionManager from "@/components/ConnectionManager";

const geologica = Geologica({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geologica'
})

export const metadata: Metadata = {
  title: "QRWC Alpha Application - Next.js",
  description: "Base file created using Next.js. This is a QRWC Alpha Application, using the QRWC private npm package. For more info please contact Thomas.HoltRonczy@QSC.com.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geologica.variable}>
      <body className="font-geologica">
        <QsysProvider>
          {/* <ConnectionManager /> */}
          <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </QsysProvider>
      </body>
    </html>
  );
}
