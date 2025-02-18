"use client";

import { getAllUserShips } from "@/actions/ship";
import WaveIcon from "@/app/components/waveicon";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Ship,
  Anchor,
  Navigation,
  Clock,
  Wrench,
  HelpCircle,
  Building2,
  Calendar,
  Radio,
  Radar,
  Factory,
  ScrollText
} from "lucide-react";

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
  const [useData, setData] = useState<ShipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUserShips();
        setData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in port":
        return <Anchor className="w-4 h-4" />;
      case "on the way":
        return <Navigation className="w-4 h-4" />;
      case "waiting":
        return <Clock className="w-4 h-4" />;
      case "fix":
        return <Wrench className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-96 h-60">
        <WaveIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <section className="flex flex-col h-auto w-auto overflow-auto mb-6 px-6">
      <h1 className="text-3xl mb-6 font-semibold flex items-center gap-2">
        <Ship className="w-8 h-8 text-blue-500" />
        Fleet Status
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4" />
                  Ship
                </div>
              </th>
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-4 h-4" />
                  Type
                </div>
              </th>
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  IMO
                </div>
              </th>
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Radar className="w-4 h-4" />
                  MMSI
                </div>
              </th>
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Built
                </div>
              </th>
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Port
                </div>
              </th>
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Factory className="w-4 h-4" />
                  ECO
                </div>
              </th>
              <th className="text-sm font-medium text-gray-600 px-4 py-3 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {useData.map((ship) => (
              <tr
                key={ship.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3">
                  <Link href={`/status/${ship.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    {ship.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{ship.type}</td>
                <td className="px-4 py-3 text-gray-600">{ship.imoNumber}</td>
                <td className="px-4 py-3 text-gray-600">{ship.mmsi}</td>
                <td className="px-4 py-3 text-gray-600">{ship.yearBuilt}</td>
                <td className="px-4 py-3 text-gray-600">{ship.portOfRegistry}</td>
                <td className="px-4 py-3 text-gray-600">{ship.ecoStandard}</td>
                <td className="px-4 py-3">
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      ship.currentStatus === "in port"
                        ? "bg-green-100 text-green-700"
                        : ship.currentStatus === "on the way"
                        ? "bg-blue-100 text-blue-700"
                        : ship.currentStatus === "waiting"
                        ? "bg-yellow-100 text-yellow-700"
                        : ship.currentStatus === "fix"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getStatusIcon(ship.currentStatus)}
                    {ship.currentStatus}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}