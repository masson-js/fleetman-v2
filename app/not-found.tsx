import Link from "next/link";
import Waves from "./client/home/components/waves";

export default function NotFound() {
  return (
    <div className="relative flex flex-col w-full h-screen bg-blue-50 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="font-mono text-2xl text-[#3fbcff]">Page not found</p>
        <Link
          href="/"
          className="w-40 mt-4 bg-[#3fbcff] text-white py-2 rounded-md hover:bg-[#1b69aa] transition duration-150 flex items-center justify-center"
        >
          Back to Home
        </Link>
      </div>
      <div className="w-full absolute bottom-0 left-0">
        <Waves />
      </div>
    </div>
  );
}
