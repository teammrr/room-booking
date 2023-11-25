import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./context/AuthProvider";
import { getServerSession } from "next-auth";
import { config } from "./auth";
// import { Providers } from "./components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book-It",
  description: "Room Reservation App",
  manifest: "/manifest.json",
  icons: { apple: "/img/logo-black.png" },
  themeColor: "#fff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(config);
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <main className="bg-[#ECEFF4] dark:bg-slate-950 min-h-screen">
          <AuthProvider session={session}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
