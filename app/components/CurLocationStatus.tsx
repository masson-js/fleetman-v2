"use client";

import { usePathname } from "next/navigation";

const pathStatusMap = {
  "/pages/status": "Fleet Status",
  "/inspections": "Ins",
  "/dashboard": "Dashboard",
  "/profile": "User Profile",
  "/settings": "Settings",
};

export default function CurLocationStatus() {
  const pathname = usePathname();
  const status =
    pathStatusMap[pathname as keyof typeof pathStatusMap] || pathname;

  return (
    <h1 className="text-xl ml-4 h-auto w-auto font-bold text-white">
      {status}
    </h1>
  );
}
