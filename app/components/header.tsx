import Link from "next/link";
import { getSession } from "@/actions/session";
import { logout } from "@/actions/logout";
import { UserCircle, LogOut } from "lucide-react";
import CurLocationStatus from "./CurLocationStatus";
import TopNavigation from "./TopNavigation";

export default async function Header() {
  const session = await getSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#57C4FF] shadow-md p-2 flex items-center">
      <div className="flex-1">
        <CurLocationStatus />
      </div>

      <div className="flex-1 flex justify-center">
        <TopNavigation />
      </div>

      <div className="flex-1 flex justify-end gap-2 py-1 font-mono text-xs">
        {session.userId && (
          <Link
            href="/client/status"
            className="bg-[#57C4FF] hover:bg-[#09A9FF] text-white w-auto px-2 text-center items-center gap-2 h-8 rounded-lg flex transition-colors duration-300"
          >
            <UserCircle className="w-6 h-6" /> <span>{session.username}</span>
          </Link>
        )}

        {session.userId && (
          <form action={logout}>
            <button className="bg-[#ff5795] hover:bg-[#cd396f] text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300">
              <LogOut className="w-6 h-6" />
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
