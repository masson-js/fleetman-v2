"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function TopNavigation() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    { path: "/forms/ship", label: "Ship", icon: "/ship.png" },
    {
      path: "/forms/inspection",
      label: "Inspection",
      icon: "/addinspection.png",
    },
    {
      path: "/forms/certification",
      label: "Certification",
      icon: "/addcer.png",
    },
    { path: "/forms/logbook", label: "Logbook", icon: "/addlogbook.png" },
    { path: "/forms/fixture", label: "Fixture", icon: "/addfixture.png" },
    { path: "/forms/crew", label: "Crew", icon: "/addcrew.png" },
    { path: "/forms/route", label: "Route", icon: "/routes.png" },
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
                ? "bg-white shadow-md"
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
    <div className="relative flex text-sm font-semibold items-center">
      <section className="flex justify-start">
        <ul className="flex flex-row items-center">
          {renderMenuItems(menuItems)}
        </ul>
      </section>
      
      <div className="relative">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className={`border border-gray-600 px-2 py-1 rounded ${
      menuOpen ? "bg-black text-white" : "text-black"
    }`}
  >
    Add
  </button>
  {menuOpen && (
    <ul className="absolute top-full left-0 mt-2 bg-white text-black shadow-md rounded w-40 z-50">
      {addMenuItems.map((item) => (
        <li key={item.path} className="px-4 py-2 hover:bg-gray-200">
          <Link href={item.path} className="flex items-center space-x-2">
            <Image src={item.icon} alt={item.label} width={20} height={20} />
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>
    </div>
  );
}
