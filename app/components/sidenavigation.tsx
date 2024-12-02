"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavigation() {
  const pathname = usePathname();

  const activeStyle = "text-blue-500 font-bold underline";

  const buttonStyle =
    "flex m-2 px-2 justify-start hover:underline cursor-pointer";
  return (
    <div className="flex flex-col w-auto text-sm font-semibold">
      <section className="flex">
        <ul className="flex flex-col justify-start ">
          <li
            className={`${buttonStyle} ${
              pathname === "/status" ? activeStyle : ""
            }`}
          >
            <Link href="/status" className="flex flex-row">
              <Image
                src="/status.png"
                alt="Status Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Status
            </Link>
          </li>

          <li
            className={`${buttonStyle} ${
              pathname === "/inspections" ? activeStyle : ""
            }`}
          >
            <Link href="/inspections" className="flex flex-row">
              <Image
                src="/document.png"
                alt="Inspection Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Inspections
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/certifications" ? activeStyle : ""
            }`}
          >
            <Link href="/certifications" className="flex flex-row">
              <Image
                src="/certification.png"
                alt="Certifications Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Certifications
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/logbooks" ? activeStyle : ""
            }`}
          >
            <Link href="/logbooks" className="flex flex-row">
              <Image
                src="/logbook.png"
                alt="Logbook Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Logbooks
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/fixtures" ? activeStyle : ""
            }`}
          >
            <Link href="/fixtures" className="flex flex-row">
              <Image
                src="/hands.png"
                alt="fixtures Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Fixtures
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/crews" ? activeStyle : ""
            }`}
          >
            <Link href="/crews" className="flex flex-row">
              <Image
                src="/crews.png"
                alt="crews Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Crews
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/fleetroutes" ? activeStyle : ""
            }`}
          >
            <Link href="/fleetroutes" className="flex flex-row">
              <Image
                src="/map.png"
                alt="Map Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Fleet routes</p>
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex border-t-2 border-gray-600 mt-2 border-opacity-20">
        <ul className="flex flex-col justify-center">
        <li
            className={`${buttonStyle} ${
              pathname === "/forms/ship" ? activeStyle : ""
            }`}
          >
            <Link href="/forms/ship" className="flex flex-row">
              <Image
                src="/ship.png"
                alt="ship Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Add Ship</p>
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/forms/inspection" ? activeStyle : ""
            }`}
          >
            <Link href="/forms/inspection" className="flex flex-row">
              <Image
                src="/addinspection.png"
                alt="inspection Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Add Inspection</p>
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/forms/certification" ? activeStyle : ""
            }`}
          >
            <Link href="/forms/certification" className="flex flex-row">
              <Image
                src="/addcer.png"
                alt="certification Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Add Certification</p>
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/forms/logbook" ? activeStyle : ""
            }`}
          >
            <Link href="/forms/logbook" className="flex flex-row">
              <Image
                src="/addlogbook.png"
                alt="logbook Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Add Logbook</p>
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/forms/fixture" ? activeStyle : ""
            }`}
          >
            <Link href="/forms/fixture" className="flex flex-row">
              <Image
                src="/addfixture.png"
                alt="fixture Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Add Fixture</p>
            </Link>
          </li>
          <li
            className={`${buttonStyle} ${
              pathname === "/forms/crew" ? activeStyle : ""
            }`}
          >
            <Link href="/forms/crew" className="flex flex-row">
              <Image
                src="/addcrew.png"
                alt="crew Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Add Crew</p>
            </Link>
          </li>

          <li
            className={`${buttonStyle} ${
              pathname === "/forms/route" ? activeStyle : ""
            }`}
          >
            <Link href="/forms/route" className="flex flex-row">
              <Image
                src="/routes.png"
                alt="routes Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              <p>Add Ship Route</p>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
