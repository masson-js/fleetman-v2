import { Loader2 } from "lucide-react";
import Waves from "../client/home/components/waves";


export function LoadingPlaceholder() {
  return (
    <div className="relative flex flex-col w-full h-screen bg-blue-50 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="w-20 h-20 animate-spin mb-4 text-[#3fbcff]" />
        <p className=" text-2xl text-[#3fbcff] ">Loading, please wait...</p>
      </div>
      <div className="w-full">
        <Waves />
      </div>
    </div>
  );
}
