"use client";

import { getAllUserShips } from "@/actions/ship";
import { Ship, MapPin, Calendar, Anchor, Radio, Building2, Leaf } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ShipData {
  id: string;
  userId: string | null;
  name: string;
  length: number;
  type: string;
  flag: string;
  imoNumber: string;
  mmsi: string;
  callsign: string;
  deadweight: number;
  beam: number;
  width: number;
  yearBuilt: number;
  currentStatus: string;
  portOfRegistry: string;
  ecoStandard: string;
}

export default function StatusList() {
  const [ships, setShips] = useState<ShipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUserShips();
        setShips(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "in port":
        return "border-green-400 bg-green-50 hover:bg-green-100";
      case "on the way":
        return "border-blue-400 bg-blue-50 hover:bg-blue-100";
      case "waiting":
        return "border-yellow-400 bg-yellow-50 hover:bg-yellow-100";
      case "fix":
        return "border-red-400 bg-red-50 hover:bg-red-100";
      default:
        return "border-gray-400 bg-gray-50 hover:bg-gray-100";
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "in port":
        return "text-green-700 bg-green-100 border-green-200";
      case "on the way":
        return "text-blue-700 bg-blue-100 border-blue-200";
      case "waiting":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "fix":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-pulse text-blue-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <section className="flex flex-col w-auto justify-start max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Ship className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">Fleet Status</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ships.map((ship) => (
          <Link
            key={ship.id}
            href={`/status/${ship.id}`}
            className={`block rounded-xl border ${getStatusStyle(
              ship.currentStatus
            )} transition-all duration-200 hover:shadow-md`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                    {ship.name}
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {ship.type}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Anchor className="w-4 h-4" />
                      <span className="text-sm">IMO: {ship.imoNumber}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Radio className="w-4 h-4" />
                      <span className="text-sm">MMSI: {ship.mmsi}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeStyle(
                    ship.currentStatus
                  )}`}
                >
                  {ship.currentStatus}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Built: {ship.yearBuilt}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Port: {ship.portOfRegistry}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    ECO: {ship.ecoStandard}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}