// TilesShips.tsx - Main component
"use client";
import { useState, useMemo } from "react";
import { Ship, Inspection } from "@/types";
import { useRouter } from "next/navigation";
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
  const [sortBy, setSortBy] = useState<
    "mostFails" | "noInspections" | "recent" | "noFails" | "default"
  >("default");
  const router = useRouter();
  const [standardFilter, setStandardFilter] = useState<string | null>(null);

  // Handle sorting and reset filter
  const handleSort = (type: typeof sortBy) => {
    setSortBy(type);
    setStandardFilter(null);
  };

  // Get all unique standards from inspections
  const allStandards = useMemo(() => {
    const standards = new Set<string>();
    inspectionsData.forEach((inspection) => {
      inspection.complianceStandards
        .split(",")
        .map((s) => s.trim())
        .forEach((standard) => standards.add(standard));
    });
    return Array.from(standards).sort();
  }, [inspectionsData]);

  // Group inspections by shipId
  const inspectionsByShipId = useMemo(
    () =>
      inspectionsData.reduce((acc, inspection) => {
        if (!acc[inspection.shipId]) acc[inspection.shipId] = [];
        acc[inspection.shipId].push(inspection);
        return acc;
      }, {} as Record<string, Inspection[]>),
    [inspectionsData]
  );

  // Prepare data for sorting
  const preparedShips = useMemo(
    () =>
      userShips.map((ship) => {
        const shipInspections = inspectionsByShipId[ship.id] || [];
        const lastInspection =
          shipInspections[shipInspections.length - 1] || null;

        return {
          ...ship,
          inspections: shipInspections,
          lastInspection,
          failedInspections: shipInspections.filter(
            (insp) => insp.verificationStatus.toLowerCase() === "failed"
          ).length,
          requiresWorkInspections: shipInspections.filter(
            (insp) => insp.verificationStatus.toLowerCase() === "requires-work"
          ).length,
          passedInspections: shipInspections.filter(
            (insp) => insp.verificationStatus.toLowerCase() === "passed"
          ).length,
          hasNoInspections: shipInspections.length === 0,
        };
      }),
    [userShips, inspectionsByShipId]
  );

  // Filter ships by standard
  const filteredShips = useMemo(() => {
    if (!standardFilter) return preparedShips;

    return preparedShips.filter((ship) =>
      ship.inspections.some((inspection) =>
        inspection.complianceStandards
          .split(",")
          .map((s) => s.trim())
          .includes(standardFilter)
      )
    );
  }, [preparedShips, standardFilter]);

  // Sort ships
  const sortedShips = useMemo(() => {
    return [...filteredShips].sort((a, b) => {
      switch (sortBy) {
        case "mostFails":
          return b.failedInspections - a.failedInspections;
        case "noInspections":
          return a.hasNoInspections ? -1 : 1;
        case "recent":
          if (!a.lastInspection) return 1;
          if (!b.lastInspection) return -1;
          return (
            new Date(b.lastInspection.inspectionDate).getTime() -
            new Date(a.lastInspection.inspectionDate).getTime()
          );
        case "noFails":
          return a.failedInspections === 0 && b.failedInspections > 0
            ? -1
            : a.failedInspections > 0 && b.failedInspections === 0
            ? 1
            : 0;
        default:
          return 0;
      }
    });
  }, [filteredShips, sortBy]);

  return (
    <div className="mb-10 w-auto h-auto">
      {/* Control Panel */}
      <div className="flex flex-wrap items-center gap-4 mb-4 bg-white shadow-lg p-2 text-xs">
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
          <ShipCard key={ship.id} ship={ship} />
        ))}
      </div>
    </div>
  );
}