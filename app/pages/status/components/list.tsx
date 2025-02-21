"use client";

import { getAllUserShips } from "@/actions/ship";
import {
  Ship,
  MapPin,
  Calendar,
  Anchor,
  Radio,
  Building2,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import WaveIcon from "@/app/components/waveicon";

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
      <div className="flex justify-center items-center h-40 m-40">
       <WaveIcon/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-sm text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="flex max-w-5xl mx-auto mt-6 p-6 gap-6">
      <section className="flex-1 bg-[#57c4ff] rounded-md p-4">
        <div className="space-y-1">
          {ships.map((ship) => (
            <Link
              key={ship.id}
              href={`/status/${ship.id}`}
              className={`block rounded-md border ${getStatusStyle(
                ship.currentStatus
              )} hover:shadow-sm transition-all duration-200`}
            >
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-medium text-sm text-gray-900 min-w-[160px] truncate">
                    {ship.name}
                  </span>

                  <div className="flex items-center gap-1 min-w-[100px]">
                    <Ship className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{ship.type}</span>
                  </div>

                  <div className="flex items-center gap-1 min-w-[100px]">
                    <Anchor className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {ship.imoNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 min-w-[100px]">
                    <Radio className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{ship.mmsi}</span>
                  </div>

                  <div className="flex items-center gap-1 min-w-[80px]">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {ship.yearBuilt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 min-w-[120px]">
                    <Building2 className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {ship.portOfRegistry}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 min-w-[100px]">
                    <Leaf className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {ship.ecoStandard}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusBadgeStyle(
                    ship.currentStatus
                  )}`}
                >
                  {ship.currentStatus}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
