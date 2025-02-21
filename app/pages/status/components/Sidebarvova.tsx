'use client'
import { useState } from "react";
import { ShipInfo } from "./ShipInfo";
import { FixturesInfo } from "./FixturesInfo";
import { InspectionsInfo } from "./InspectionsInfo";
import { FuelInfo } from "./FuelInfo";
import { CrewInfo } from "./CrewInfo";

interface Ship {
  id: string;
  name: string;
  totalFixtures: number;
  totalInspections: number;
  totalRevenue: number;
  lastInspectionStatus: string;
  totalFuelConsumption: number;
  totalFuelCost: number;
  totalCrew: number;
  crewStatus: { active: number; onLeave: number; dismissed: number };
}

interface SidebarProps {
  ships: Ship[];
}

export function Sidebar({ ships }: SidebarProps) {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(ships[0] || null);

  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Корабли</h2>
        <ul className="space-y-2">
          {ships.map((ship) => (
            <li
              key={ship.id}
              className={`p-2 rounded cursor-pointer ${
                selectedShip?.id === ship.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedShip(ship)}
            >
              {ship.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        {selectedShip && (
          <div className="space-y-4">
            <ShipInfo ship={selectedShip} />
            <FixturesInfo totalFixtures={selectedShip.totalFixtures} totalRevenue={selectedShip.totalRevenue} />
            <InspectionsInfo
              totalInspections={selectedShip.totalInspections}
              lastInspectionStatus={selectedShip.lastInspectionStatus}
            />
            <FuelInfo
              totalFuelConsumption={selectedShip.totalFuelConsumption}
              totalFuelCost={selectedShip.totalFuelCost}
            />
            <CrewInfo totalCrew={selectedShip.totalCrew} crewStatus={selectedShip.crewStatus} />
          </div>
        )}
      </div>
    </div>
  );
}