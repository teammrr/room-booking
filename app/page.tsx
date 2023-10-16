"use client";

import { useSession } from "next-auth/react";
import Header from "./components/header";
// import { navigation, classNames } from "./page";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header />
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        Welcome to Newton&apos;s Room Reservation System
      </h1>
    </main>
  );
}
