import Link from "next/link";
import { getSession } from "@/actions/session";
import { LogOut } from "@/app/components/buttons";
import { logout } from "@/actions/logout";

export default async function HomeHeader() {
  const session = await getSession();

  return (
    <nav className="flex justify-end py-4 mt-2 mr-6 gap-6 font-mono text-xs text-center">
      <Link
        className="text-black px-4 py-1 rounded-lg hover:underline "
        href="/about"
      >
        About
      </Link>
      <Link
        className="text-black px-4 py-1 rounded-lg hover:underline "
        href="/prices"
      >
        Prices
      </Link>
      {session.userId && (
        <Link
          href="/status"
          className="bg-[#57C4FF] text-white px-4 py-1 rounded-lg hover:bg-[#09A9FF] transition-colors duration-300"
        >
          Hi, {session.username}
        </Link>
      )}

      {!session.username && (
        <Link
          className="bg-[#57C4FF] text-white px-4 py-1 rounded-lg hover:bg-[#09A9FF] transition-colors duration-300"
          href="/login"
        >
          Login
        </Link>
      )}
      {!session.username && (
        <Link
          className="bg-[#57C4FF] text-white px-4 py-1 rounded-lg hover:bg-[#09A9FF] transition-colors duration-300"
          href="/registration"
        >
          Registration
        </Link>
      )}
      {session.userId && (
        <form action={logout}>
          <button className="bg-[#ff5795] text-white px-4 py-1 rounded-lg hover:bg-[#cd396f] transition-colors duration-300">
            Log out
          </button>
        </form>
      )}
    </nav>
  );
}
