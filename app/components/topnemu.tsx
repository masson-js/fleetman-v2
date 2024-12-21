"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function TopNavigation() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const pathname = usePathname();

  const activeStyle = "text-blue-600 font-bold underline";
  const buttonStyle =
    "relative flex flex-col items-center m-2 px-2 cursor-pointer";

  const menuItems = [
    { path: "/status", label: "Status", icon: "/status.png" },
    { path: "/inspections", label: "Inspections", icon: "/document.png" },
    {
      path: "/certifications",
      label: "Certifications",
      icon: "/certification.png",
    },
    { path: "/logbooks", label: "Logbooks", icon: "/logbook.png" },
    { path: "/fixtures", label: "Fixtures", icon: "/hands.png" },
    { path: "/crews", label: "Crews", icon: "/crews.png" },
    { path: "/fleetroutes", label: "Routes", icon: "/map.png" },
  ];

  const addMenuItems = [
    { path: "/forms/ship", label: "Add Ship", icon: "/ship.png" },
    {
      path: "/forms/inspection",
      label: "Add Inspection",
      icon: "/addinspection.png",
    },
    {
      path: "/forms/certification",
      label: "Add Certification",
      icon: "/addcer.png",
    },
    { path: "/forms/logbook", label: "Add Logbook", icon: "/addlogbook.png" },
    { path: "/forms/fixture", label: "Add Fixture", icon: "/addfixture.png" },
    { path: "/forms/crew", label: "Add Crew", icon: "/addcrew.png" },
    { path: "/forms/route", label: "Add Route", icon: "/routes.png" },
  ];

  const renderMenuItems = (
    items: { path: string; label: string; icon: string }[]
  ) =>
    items.map((item) => (
      <li
        key={item.path}
        className={`${buttonStyle} ${
          pathname === item.path ? activeStyle : ""
        }`}
        onMouseEnter={() => setHoveredButton(item.path)}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Link href={item.path} className="flex flex-col items-center relative">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              pathname === item.path || hoveredButton === item.path
                ? "bg-white shadow-md border-4 border-blue-400"
                : "bg-transparent"
            }`}
          >
            <Image
              src={item.icon}
              alt={`${item.label} Icon`}
              className="w-6 h-6 transition-transform duration-300"
              width={24}
              height={24}
            />
          </div>
          <span
            className={`absolute top-12 transition-opacity duration-300 ${
              hoveredButton === item.path ? "opacity-100" : "opacity-0"
            } text-black p-1 rounded-md bg-white border border-gray-600 shadow-md`}
          >
            {item.label}
          </span>
        </Link>
      </li>
    ));

  return (
    <div className="flex  text-sm font-semibold">
      <section className="flex justify-start">
        <ul className="flex flex-row items-center">
          {renderMenuItems(menuItems)}
        </ul>
      </section>
      <section className="flex  border-opacity-20">
        <ul className="flex flex-row items-center w-auto">
          {renderMenuItems(addMenuItems)}
        </ul>
      </section>
    </div>
  );
}
