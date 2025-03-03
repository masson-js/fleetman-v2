"use client";

import { useRouter } from "next/navigation";
import { Ship, Flag, RadioTower } from "lucide-react";

interface StatusListProps {
  ships: {
    id: string;
    name: string;
    type: string;
    flag: string;
    imoNumber: string;
    mmsi: string;
    callsign: string;
  }[];
}

export default function ShipList({ ships }: StatusListProps) {
  const router = useRouter();

  return (
    <div className="p-6 bg-blue-50">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white rounded-t-lg">
          <thead className="bg-[#09A9FF] text-white text-xs">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Flag</th>
              <th className="p-3 text-left">IMO</th>
              <th className="p-3 text-left">MMSI</th>
              <th className="p-3 text-left">Callsign</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship, index) => (
              <tr
                key={ship.id}
                onClick={() => router.push(`/ship/${ship.id}`)}
                className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                  index === ships.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                <td className="p-3 text-xs flex items-center gap-2">
                  <Ship size={16} className="text-blue-500" /> {ship.name}
                </td>
                <td className="p-3 text-xs">{ship.type}</td>
                <td className="p-3 text-xs flex items-center gap-2">
                  <Flag size={16} className="text-green-500" /> {ship.flag}
                </td>
                <td className="p-3 text-xs">{ship.imoNumber}</td>
                <td className="p-3 text-xs">{ship.mmsi}</td>
                <td className="p-3 text-xs flex items-center gap-2">
                  <RadioTower size={16} className="text-red-500" /> {ship.callsign}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
