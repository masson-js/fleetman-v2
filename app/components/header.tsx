import { getSession } from "@/actions";
import { LoginButton, LogOut, RegistrationButton } from "./buttons";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="flex bg-gray-200 h-16 justify-end items-center">
      <nav className="flex mx-8 gap-4">
        {session.userId && <p>Welcome back</p>}
        <span>{session.username}</span>
        {!session.username && <LoginButton />}
        {!session.username && <RegistrationButton />}
        {session.userId && <LogOut />}
      </nav>
    </header>
  );
}
