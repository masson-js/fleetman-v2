"use client";

import { usePathname } from "next/navigation";

const pathStatusMap = {
  "/client/status": "Fleet Status",
  "/client/inspections": "Inspections",
  "/dashboard": "Dashboard",
  "/pages/ship": "Ship",
  "/profile": "User Profile",
  "/settings": "Settings",
  "/client/forms/ship": " ",
  "/client/forms/inspection": " ",
  "/client/forms/fuel": " ",
  "/client/forms/certification": " ",
  "/client/forms/fixture": " ",
  "/client/forms/crew": " ",
  "/client/forms/route": " ",
  "/client/forms/logbook": " ",
};

const HIDDEN_PATH_PATTERNS = [
  /^\/client\/ship\/.+/,
  /^\/client\/inspections\/.+/,
];

export default function CurLocationStatus() {
  const pathname = usePathname();

  const shouldHide = HIDDEN_PATH_PATTERNS.some((pattern) =>
    pattern.test(pathname)
  );

  if (shouldHide) {
    return <span className="w-12 h-auto" />;
  }

  const status =
    pathStatusMap[pathname as keyof typeof pathStatusMap] || pathname;

  return (
    <h1 className="text-xl ml-4 h-auto w-auto font-bold text-white">
      {status}
    </h1>
  );
}
