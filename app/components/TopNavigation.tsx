"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart2,
  ClipboardCheck,
  Award,
  BookOpen,
  Handshake,
  Users,
  Map,
  Ship,
  Plus,
  Route,
} from "lucide-react";

export default function TopNavigation() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const baseButtonStyle =
    "bg-[#57C4FF] text-white w-8 h-8 rounded-lg hover:bg-[#09A9FF] transition-colors duration-300 flex items-center justify-center";
  const buttonStyle = "relative flex flex-col items-center cursor-pointer";

  const menuItems = [
    { path: "/client/status", label: "Status", Icon: BarChart2 },
    { path: "/client/inspections", label: "Inspections", Icon: ClipboardCheck },
    { path: "/client/certifications", label: "Certifications", Icon: Award },
    { path: "/client/logbooks", label: "Logbooks", Icon: BookOpen },
    { path: "/client/fixtures", label: "Fixtures", Icon: Handshake },
    { path: "/client/crews", label: "Crews", Icon: Users },
    { path: "/client/routes", label: "Routes", Icon: Map },
  ];

  const addMenuItems = [
    { path: "/client/forms/ship", label: "Ship", Icon: Ship },
    { path: "/client/forms/inspection", label: "Inspection", Icon: ClipboardCheck },
    { path: "/client/forms/certification", label: "Certification", Icon: Award },
    { path: "/client/forms/logbook", label: "Logbook", Icon: BookOpen },
    { path: "/client/forms/fixture", label: "Fixture", Icon: Handshake },
    { path: "/client/forms/crew", label: "Crew", Icon: Users },
    { path: "/client/forms/route", label: "Route", Icon: Route },
    { path: "/client/forms/fuel", label: "Fuel Record", Icon: Route },
  ];

  const renderMenuItems = (
    items: { path: string; label: string; Icon: any }[]
  ) =>
    items.map((item) => (
      <li
        key={item.path}
        className={`${buttonStyle} ${
          pathname === item.path ? "opacity-90" : ""
        }`}
        onMouseEnter={() => setHoveredButton(item.path)}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Link href={item.path} className="flex flex-col items-center relative">
          <div className={baseButtonStyle}>
            <item.Icon className="w-6 h-6" />
          </div>
          <span
            className={`absolute  -bottom-8 transition-opacity duration-300 ${
              hoveredButton === item.path ? "opacity-100" : "opacity-0"
            } text-black p-1 rounded-md bg-white border border-gray-200 shadow-md text-sm whitespace-nowrap`}
          >
            {item.label}
          </span>
        </Link>
      </li>
    ));

  return (
    <div className="relative flex text-sm font-semibold items-center gap-2">
      <section className="flex justify-start">
        <ul className="flex flex-row items-center gap-2">
          {renderMenuItems(menuItems)}
        </ul>
      </section>
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={baseButtonStyle}
        >
          <Plus className="w-6 h-6" />
        </button>

        {menuOpen && (
          <ul className="absolute top-full right-0 mt-2 bg-white text-black shadow-md rounded-lg w-48 z-50 py-2">
            {addMenuItems.map((item) => (
              <li key={item.path} className="hover:bg-gray-50">
                <Link
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  <item.Icon className="w-5 h-5 text-[#57C4FF]" />
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
