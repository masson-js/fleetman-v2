"use server";
import { getSession } from "@/actions";
import { LoginButton, LogOut, RegistrationButton } from "./buttons";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="flex bg-gray-200 h-8 mb-6 justify-end items-center">
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
