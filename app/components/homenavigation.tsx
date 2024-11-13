import Image from "next/image";
import {
  LoginButton,
  LogOut,
  RegistrationButton,
  TryDemoButton,
} from "./buttons";
import { getSession } from "@/actions";
import Link from "next/link";

export default async function HomeNavigation() {
  const session = await getSession();
  return (
    <div className="flex flex-col w-1/2 items-center bg-gray-100 mb-8">
      <div className="flex gap-10 mt-8">
        {!session.userId && <LoginButton />}
        {!session.isLoggedIn && <RegistrationButton />}
        {!session.isLoggedIn && <TryDemoButton />}
      </div>
      <div className="flex flex-col mt-2 w-96">
        <Link href="/status">
          <div className="flex flex-col bg-gray-200 my-2 p-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
            <span className="flex flex-row text-lg font-bold text-gray-800 ">
              <Image
                src="/status.png"
                alt="status Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Status Monitoring
            </span>
            <h2 className=" text-sm font-normal text-gray-800 opacity-60">
              Easily check the operational status of your vessels
            </h2>
          </div>
        </Link>
        <Link href="/inspections">
          <div className="flex flex-col bg-gray-200 my-2 p-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
            <span className="flex flex-row text-lg font-bold text-gray-800 ">
              <Image
                src="/document.png"
                alt="document Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Inspections Tracking
            </span>
            <h2 className="text-sm  font-normal text-gray-800 opacity-60">
              Monitor inspections coverage and renewal dates to ensure your
              vessels are always adequately protected
            </h2>
          </div>
        </Link>
        <Link href="/logbooks">
          <div className="flex flex-col bg-gray-200 my-2 p-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
            <span className="flex flex-row text-lg font-bold text-gray-800 ">
              <Image
                src="/logbook.png"
                alt="logbook Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Logbook Management
            </span>
            <h2 className="text-sm  font-normal text-gray-800 opacity-60">
              Maintain accurate and accessible logbooks for all vessels,
              facilitating compliance and reporting
            </h2>
          </div>
        </Link>
        <Link href="/fixtures">
          <div className="flex flex-col bg-gray-200 my-2 p-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
            <span className="flex flex-row text-lg font-bold text-gray-800 ">
              <Image
                src="/fixtures.png"
                alt="fixtures Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Fixtures Management
            </span>
            <h2 className="text-sm  font-normal text-gray-800 opacity-60">
              Efficiently manage charter contracts, monitor obligations, and
              track the performance of chartered vessels
            </h2>
          </div>
        </Link>

        <Link href="/fleetmap">
          <div className="flex flex-col bg-gray-200 my-2 p-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
            <span className="flex flex-row text-lg font-bold text-gray-800 ">
              <Image
                src="/hands.png"
                alt="hands Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Crew
            </span>
            <h2 className="text-sm  font-normal text-gray-800 opacity-60">
              Manage and track the crew's qualifications, certifications, and
              availability
            </h2>
          </div>
        </Link>
        <Link href="/fleetmap">
          <div className="flex flex-col bg-gray-200 my-2 p-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
            <span className="flex flex-row text-lg font-bold text-gray-800 ">
              <Image
                src="/map.png"
                alt="map Icon"
                className="w-6 h-6 mr-2"
                width={24}
                height={24}
              />
              Interactive Map
            </span>
            <h2 className="text-sm  font-normal text-gray-800 opacity-60">
              Visualize your fleet's positions on an interactive map
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
