// ShipCard.tsx
import React from "react";
import Link from "next/link";
import standartsColors from "@/public/lists/standartsColors.json";
import { Ship, Inspection } from "@/types";

interface ShipCardProps {
  ship: Ship & {
    inspections: Inspection[];
    lastInspection: Inspection | null;
    failedInspections: number;
    requiresWorkInspections: number;
    passedInspections: number;
    hasNoInspections: boolean;
  };
}

export default function ShipCard({ ship }: ShipCardProps) {
  // Calculate compliance standards
  const complianceStandards = ship.inspections.reduce(
    (acc, inspection) => {
      inspection.complianceStandards
        .split(",")
        .map((s) => s.trim())
        .forEach((standard) => {
          acc[standard] = (acc[standard] || 0) + 1;
        });
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <Link
      href={`/client/inspections/${ship.id}`}
      className="block hover:cursor-pointer"
    >
      <div
        className={`bg-white shadow-md p-4 hover:shadow-xl transition-all duration-200 hover:bg-slate-50 ${
          ship.hasNoInspections
            ? "border-l-4 border-yellow-500"
            : ship.failedInspections > 0
            ? "border-l-4 border-red-500"
            : "border-l-4 border-green-500"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <ShipInfo ship={ship} />
          <ShipStatistics ship={ship} />
          <ShipCompliance 
            complianceStandards={complianceStandards} 
            lastInspection={ship.lastInspection} 
          />
        </div>
      </div>
    </Link>
  );
}

function ShipInfo({ ship }: { ship: ShipCardProps["ship"] }) {
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-bold inline-block border-b-2 border-[#57C4FF]">
        {ship.name}
      </h3>
      <div className="flex items-center">
        <span className="text-gray-600 text-xs">{ship.type}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 mr-2 text-xs">IMO:</span>
        <span className="text-xs">{ship.imoNumber}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 text-xs mr-2">Inspections:</span>
        <span className="text-xs">{ship.inspections.length}</span>
      </div>
    </div>
  );
}

function ShipStatistics({ ship }: { ship: ShipCardProps["ship"] }) {
  // Group inspections by verification status
  const inspectionsByStatus = ship.inspections.reduce((acc, insp) => {
    acc[insp.verificationStatus] = (acc[insp.verificationStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-xs">Statistics</h4>
      <div className="flex flex-col flex-wrap text-xs">
        <div>
          <span className="text-gray-600">EU Compliance:</span>
          <span className="ml-2">
            {ship.inspections.filter((i) => i.isEUCompliance).length}
          </span>
        </div>
        {Object.entries(inspectionsByStatus).map(([status, count]) => (
          <div key={status}>
            <span className="text-gray-600">{status}:</span>
            <span className="ml-2">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShipCompliance({ 
  complianceStandards, 
  lastInspection 
}: { 
  complianceStandards: Record<string, number>;
  lastInspection: Inspection | null;
}) {
  return (
    <div className="space-y-2 text-xs">
      <div>
        <h4 className="font-semibold">Compliance Standards</h4>
        <div className="flex flex-wrap gap-1 mt-1">
          {Object.entries(complianceStandards).map(([standard, count]) => (
            <span
              key={standard}
              className="text-xs px-2 py-1 mr-1 mb-1 inline-block text-black"
              style={{
                borderBottom: `2px solid ${
                  (standartsColors.complianceStandards as Record<string, string>)[
                    standard
                  ] || "#1E90FF"
                }`,
              }}
              title={`${standard}: ${count} раз`}
            >
              {standard}: {count}
            </span>
          ))}
        </div>
      </div>

      {lastInspection ? (
        <div className="mt-2 text-xs">
          <h4 className="font-semibold">Last inspection:</h4>
          <div className="">
            <div>
              <span className="text-gray-600">Date:</span>
              <span className="ml-2">
                {new Date(lastInspection.inspectionDate).toISOString().split("T")[0]}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Type:</span>
              <span className="ml-2">{lastInspection.inspectionType}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span
                className={`ml-2 font-medium ${
                  lastInspection.verificationStatus.toLowerCase() === "passed"
                    ? "text-green-600"
                    : lastInspection.verificationStatus.toLowerCase() === "requires-work"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {lastInspection.verificationStatus}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-yellow-600 font-medium">
          No information about inspections
        </div>
      )}
    </div>
  );
}