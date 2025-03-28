"use client";

import { usePathname } from "next/navigation";

const pathStatusMap = {
  "/client/status": "Fleet Status",
  "/client/inspections": "Ins",
  "/dashboard": "Dashboard",
  "/pages/ship": "ship",
  "/profile": "User Profile",
  "/settings": "Settings",
  "/client/forms/ship" : " ",
  "/client/forms/inspection" : " ",
  "/client/forms/fuel" : " ",
  "/client/forms/certification" : " ",
  "/client/forms/fixture" : " ",
  "/client/forms/crew" : " ",
  "/client/forms/route" : " ",
  "/client/forms/logbook" : " "
};

export default function CurLocationStatus() {
  const pathname = usePathname();
  if (pathname.startsWith("/client/ship/")) {
    return (
      <span className="w-12 h-auto"></span>
    );
  }
  const status =
    pathStatusMap[pathname as keyof typeof pathStatusMap] || pathname;

  return (
    <h1 className="text-xl ml-4 h-auto w-auto font-bold text-white">
      {status}
    </h1>
  );
}
