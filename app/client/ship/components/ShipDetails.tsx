"use client";

import { Leaf } from "lucide-react";
import { deleteShip } from "@/actions/ship";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ShipProps {
  ship: {
    id: string;
    name: string;
    type: string;
    flag: string;
    imoNumber: string;
    mmsi: string;
    callsign: string;
    deadweight: number;
    length: number;
    beam: number;
    width: number;
    yearBuilt: number;
    currentStatus: string;
    portOfRegistry: string;
    ecoStandard: string;
    fuelRecords: any[];
    routes: any[];
    certifications: any[];
    inspections: any[];
    fixtures: any[];
    crew: any[];
    logbooks: any[];
  };
}

type ShipStatus = "in port" | "on the way" | "waiting" | "fix" | "other";

export default function ShipDetailsTop({ ship }: ShipProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ship? This action cannot be undone."
    );

    if (!confirmDelete) return;

    setIsDeleting(true);

    const formData = new FormData();
    formData.append("shipId", ship.id);

    try {
      const result = await deleteShip({}, formData);

      if (result.success) {
        router.push("/client/status");
      } else {
        alert(result.error || "Failed to delete ship");
      }
    } catch (error) {
      console.error("Delete ship error:", error);
      alert("An error occurred while deleting the ship");
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusClass = (status: string): string => {
    const statusMap: Record<ShipStatus, string> = {
      "in port": "bg-green-500 text-white",
      "on the way": "bg-blue-500 text-white",
      waiting: "bg-yellow-500 text-white",
      fix: "bg-red-500 text-white",
      other: "bg-gray-500 text-white",
    };

    return (status as ShipStatus) in statusMap
      ? statusMap[status as ShipStatus]
      : "bg-gray-300 text-black";
  };

  return (
    <div className="flex flex-col animate-fade-in bg-blue-50 w-4/6 mx-auto">
      {/* Ship Title Section */}
      <div className="flex mt-24 p-4  bg-white text-black text-xs rounded-t-lg ">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              className="w-full h-full object-cover"
              src="/output.jpg"
              alt={ship.name}
            />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
            <div className="w-full">
              <h1 className="text-xl font-bold text-black transition-colors duration-300">
                {ship.name}
              </h1>
              <div className="flex flex-wrap items-center mt-2 gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-thin ${getStatusClass(
                    ship.currentStatus
                  )}`}
                >
                  {ship.currentStatus}
                </span>
                <span className="flex items-center text-xs font-thin">
                  {ship.type}
                </span>
                <span className="flex items-center text-xs font-thin">
                  {ship.portOfRegistry}, {ship.flag}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500">IMO Number:</span>
                    <span className="text-xs font-medium">
                      {ship.imoNumber}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500">MMSI:</span>
                    <span className="text-xs font-medium">{ship.mmsi}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500">Callsign:</span>
                    <span className="text-xs font-medium">{ship.callsign}</span>
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    <span className="text-xs text-gray-500">Year Built:</span>
                    <span className="text-xs font-medium">
                      {ship.yearBuilt}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    <span className="text-xs text-gray-500">Deadweight:</span>
                    <span className="text-xs font-medium">
                      {ship.deadweight} t
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500">Length:</span>
                    <span className="text-xs font-medium">{ship.length} m</span>
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    <span className="text-xs text-gray-500">Beam:</span>
                    <span className="text-xs font-medium">{ship.beam} m</span>
                  </div>
                  <div className="flex gap-2">
                    {" "}
                    <span className="text-xs text-gray-500">Width:</span>
                    <span className="text-xs font-medium">{ship.width} m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row flex-wrap">
          <div>
            <div className="grid grid-cols-2 gap-y-2">
              <span className="flex flex-row  gap-1 text-xs text-gray-500">
                <Leaf size={14} className="text-green-500" />
                ECO Standard:
              </span>
              <span className="text-xs font-medium">{ship.ecoStandard}</span>
            </div>
            <div className="flex flex-row flex-wrap gap-2 justify-end m-2 p-2 text-xs text-white">
              <button className=" rounded-lg w-16 h-auto p-2 bg-[#ffa500] hover:bg-[rgb(255,123,0)]">
                edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg w-16 h-auto p-2 bg-[#e81416] hover:bg-[#a22628] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom panel */}

      <div className="flex justify-between shadow-sm flex-wrap  bg-white text-black rounded-b-lg text-xs">
        <div className="flex flex-col justify-between p-4 w-auto h-auto">
          <div className="flex items-center gap-2">
            <h2 className="font-light text-center text-sm border-b-2 w-24 border-[#e81416]">
              Fixtures
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {ship.fixtures.length}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-auto h-auto ">
          <div className="flex items-center gap-2">
            <h2 className="font-light text-center text-sm border-b-2 w-24 border-[#ffa500]">
              Inspections
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {ship.inspections.length}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-auto h-auto ">
          <div className="flex items-center gap-2">
            <h2 className="font-light text-center text-sm border-b-2 w-24 border-[#79c314]">
              Certificates
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {ship.certifications.length}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-auto h-auto">
          <div className="flex items-center gap-2">
            <h2 className="font-light text-center text-sm border-b-2 w-24 border-[#4b369d]">
              Fuel Rec
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {ship.fuelRecords.length}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-auto h-auto ">
          <div className="flex items-center gap-2">
            <h2 className="font-light text-center text-sm border-b-2 w-24 border-[#4400ff]">
              Routes
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {ship.routes.length}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-auto h-auto ">
          <div className="flex items-center gap-2">
            <h2 className="font-light text-center text-sm border-b-2 w-24 border-[#70369d]">
              Crew
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {ship.crew.length}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-auto h-auto ">
          <div className="flex items-center gap-2">
            <h2 className="font-light text-center text-sm border-b-2 w-24 border-[#2a0e0e]">
              Logbooks
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {ship.logbooks.length}
          </span>
        </div>
      </div>
    </div>
  );
}
