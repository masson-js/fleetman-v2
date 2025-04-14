// useTilesShipsLogic.ts
import { useMemo, useState } from "react";
import { Ship, Inspection } from "@/types";

type SortByType = "mostFails" | "noInspections" | "recent" | "noFails" | "default";

export function useTilesShipsLogic(userShips: Ship[], inspectionsData: Inspection[]) {
  const [sortBy, setSortBy] = useState<SortByType>("default");
  const [standardFilter, setStandardFilter] = useState<string | null>(null);

  // Handle sorting and reset filter
  const handleSort = (type: SortByType) => {
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

  return {
    sortBy,
    standardFilter,
    allStandards,
    sortedShips,
    handleSort,
    setStandardFilter,
  };
}

// Можно также добавить типы для использования в компонентах
export type PreparedShip = Ship & {
  inspections: Inspection[];
  lastInspection: Inspection | null;
  failedInspections: number;
  requiresWorkInspections: number;
  passedInspections: number;
  hasNoInspections: boolean;
};