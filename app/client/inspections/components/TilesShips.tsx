// TilesShips.tsx - Упрощенный основной компонент
"use client";
import { useRouter } from "next/navigation";
import { Ship, Inspection } from "@/types";
import { useTilesShipsLogic, PreparedShip } from "./useTilesShipsLogic";
import SortingPanel from "./SortingPanel";
import FilterPanel from "./FilterPanel";
import ShipCard from "./ShipCard";

interface UserShipsProps {
  userShips: Ship[];
  inspectionsData: Inspection[];
}

export default function TilesShips({
  userShips,
  inspectionsData,
}: UserShipsProps) {
  const router = useRouter();
  
  const {
    sortBy,
    standardFilter,
    allStandards,
    sortedShips,
    handleSort,
    setStandardFilter,
  } = useTilesShipsLogic(userShips, inspectionsData);

  return (
    <div className="mb-10 w-auto h-auto">
      <div className="flex flex-wrap items-center bg-white shadow-lg p-2 text-xs mb-2 rounded-lg">
        <SortingPanel sortBy={sortBy} handleSort={handleSort} />
        <FilterPanel 
          allStandards={allStandards} 
          standardFilter={standardFilter} 
          setStandardFilter={setStandardFilter} 
        />
      </div>

      {/* Ship List */}
      <div className="space-y-4">
        {sortedShips.map((ship) => (
          <ShipCard key={ship.id} ship={ship as PreparedShip} />
        ))}
      </div>
    </div>
  );
}