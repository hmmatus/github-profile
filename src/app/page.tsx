"use client";
import Nav from "@/components/elements/nav/Nav";
import HomeLayout from "@/components/layouts/home/HomeLayout";
import { UserProvider } from "@/context/Context";

export default function Home() {
  return (
    <main>
      <UserProvider>
        <Nav />
        <HomeLayout />
      </UserProvider>
    </main>
  );
}
