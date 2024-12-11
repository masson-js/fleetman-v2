"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideNavigation() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const pathname = usePathname();

  const activeStyle = "text-blue-600 font-bold underline";
  const buttonStyle = "relative flex m-2 px-2 justify-start cursor-pointer";

  const menuItems = [
    { path: "/status", label: "Status", icon: "/status.png" },
    { path: "/inspections", label: "Inspections", icon: "/document.png" },
    { path: "/certifications", label: "Certifications", icon: "/certification.png" },
    { path: "/logbooks", label: "Logbooks", icon: "/logbook.png" },
    { path: "/fixtures", label: "Fixtures", icon: "/hands.png" },
    { path: "/crews", label: "Crews", icon: "/crews.png" },
    { path: "/fleetroutes", label: "Routes", icon: "/map.png" },
  ];

  const addMenuItems = [
    { path: "/forms/ship", label: "Ship", icon: "/ship.png" },
    { path: "/forms/inspection", label: "Inspection", icon: "/addinspection.png" },
    { path: "/forms/certification", label: "Certification", icon: "/addcer.png" },
    { path: "/forms/logbook", label: "Logbook", icon: "/addlogbook.png" },
    { path: "/forms/fixture", label: "Fixture", icon: "/addfixture.png" },
    { path: "/forms/crew", label: "Crew", icon: "/addcrew.png" },
    { path: "/forms/route", label: "Route", icon: "/routes.png" },
  ];

  const renderMenuItems = (items: { path: string; label: string; icon: string }[]) =>
    items.map((item) => (
      <li
        key={item.path}
        className={`${buttonStyle} ${
          pathname === item.path ? activeStyle : ""
        }`}
        onMouseEnter={() => setHoveredButton(item.path)}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Link href={item.path} className="flex items-center relative">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              pathname === item.path || hoveredButton === item.path
                ? "bg-white shadow-md border border-gray-600"
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
            className={`absolute left-10 top-0 transition-opacity duration-300 ${
              hoveredButton === item.path ? "opacity-100" : "opacity-0"
            }  text-black p-1 rounded-md bg-white border border-gray-600 shadow-md`}
          >
            {item.label}
          </span>
        </Link>
      </li>
    ));

  return (
    <div className="flex flex-col w-auto text-sm font-semibold">
      <section className="flex">
        <ul className="flex flex-col justify-start">{renderMenuItems(menuItems)}</ul>
      </section>

      <div className="flex mt-2">
        <button onClick={() => setIsMenuVisible((prev) => !prev)} className=" justify-start ml-4 border-b-2 border-gray-600 border-opacity-20">
          Add
        </button>
      </div>

      <section className="flex flex-col mt-2 border-opacity-20">
        {isMenuVisible && <ul className="flex flex-col justify-center">{renderMenuItems(addMenuItems)}</ul>}
      </section>
    </div>
  );
}
