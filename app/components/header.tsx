"use server";
import { getSession } from "@/actions/session";
import { LoginButton, LogOut, RegistrationButton } from "./buttons";
import TopNavigation from "./topnemu";
import Image from "next/image";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="flex bg-gray-200 w-auto h-auto justify-between items-center">
      <Image src="/fleety.svg" alt="Logo" width={100} height={100} className="ml-6 mx-2 mt-2 flex items-center justify-center" />
      <TopNavigation/>
      <nav className="flex mx-8 gap-2 items-center">
        {session.userId && <p className="font-semibold">Hi,</p>}
        <span className="font-semibold flex mr-6">{session.username}</span>
        {!session.username && <LoginButton />}
        {!session.username && <RegistrationButton />}
        {session.userId && <LogOut />}
      </nav>
    </header>
  );
}
