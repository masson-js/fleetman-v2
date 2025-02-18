

import Link from "next/link";
import { getSession } from "@/actions/session";
import { logout } from "@/actions/logout";
import Testnav from "./TopNavigation2";
import { UserCircle, LogOut } from "lucide-react";

export default async function Header2() {
  const session = await getSession();

  return (
    <nav className="flex justify-end mt-1 mr-6 gap-2 font-mono text-xs text-center">
      <Testnav />
      {session.userId && (
        <Link
          href="/pages/status"
          className="bg-[#57C4FF] hover:bg-[#09A9FF] text-white w-auto px-2 gap-2 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
        >
          <UserCircle className="w-6 h-6" /> <span>{session.username} </span>
        </Link>
      )}
      {session.userId && (
        <form action={logout}>
          <button className="bg-[#ff5795] hover:bg-[#cd396f] text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300">
            <LogOut className="w-6 h-6" />
          </button>
        </form>
      )}
    </nav>
  );
}