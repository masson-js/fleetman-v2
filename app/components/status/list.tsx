"use client";

import { getAllUserShips } from "@/actions/ship";
import {
  InspectionEnhancedButton,
  StatusEnhancedButton,
} from "@/app/components/buttons";
import WaveIcon from "@/app/components/waveicon";
import { useEffect, useState } from "react";
interface Ship {
  id: string;
  userId: string | null;
  name: string;
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
  const [shipStatus, setShipStatus] = useState<Ship[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shipStatus) {
      const fetchMemberData = async () => {
        try {
          setLoading(true);
          const data = await getAllUserShips();
          setShipStatus(data);
        } catch (err) {
          setError("Error fetching crew member");
        } finally {
          setLoading(false);
        }
      };
      fetchMemberData();
    }
  }, [shipStatus]);

  if (loading) {
    return (
      <div className="flex content-center">
        <WaveIcon />
      </div>
    );
  }

  if (!shipStatus || shipStatus.length === 0) {
    return <WaveIcon />;
  }

  return (
    <section className="flex-1 m-6 max-w-max overflow-auto">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
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
          {shipStatus.map((ship) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={ship.id}
            >
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.name}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.type}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.imoNumber}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.mmsi}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.yearBuilt}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.portOfRegistry}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.ecoStandard}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.currentStatus}
                </StatusEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
