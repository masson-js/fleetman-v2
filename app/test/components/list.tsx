"use client";

import { getAllUserShips } from "@/actions/ship";
import WaveIcon from "@/app/components/waveicon";
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
    <section className="flex flex-col h-auto w-auto overflow-auto mb-6">
      <h1 className="text-3xl mb-4 italic border-l-4 border-blue-400 pl-2">
        Status
      </h1>

      <table className="table-auto rounded-lg overflow-hidden w-full bg-white">
        <thead>
          <tr className="items-center">
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tl-lg w-36">
              Ship
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Type
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              IMO
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              MMSI
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Built
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Port
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-56">
              ECO
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tr-lg w-28">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {useData.map((ship) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={ship.id}
            >
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.name}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.type}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.imoNumber}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.mmsi}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.yearBuilt}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.portOfRegistry}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.ecoStandard}</Link>
              </td>
              <td
                className={`text-sm font-bold ${
                  ship.currentStatus === "in port"
                    ? "bg-green-500 text-white"
                    : ship.currentStatus === "on the way"
                    ? "bg-blue-500 text-white"
                    : ship.currentStatus === "waiting"
                    ? "bg-yellow-500 text-white"
                    : ship.currentStatus === "fix"
                    ? "bg-red-500 text-white"
                    : ship.currentStatus === "other"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <Link href={`/status/${ship.id}`}>{ship.currentStatus}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
