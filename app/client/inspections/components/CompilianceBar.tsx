"use client";

import { Inspection } from "@/types";

type ComplianceCount = Record<string, number>;

interface InformationBarProps {
  inspectionsData: Inspection[];
}

export default function CompilianceBar({
  inspectionsData,
}: InformationBarProps) {
  const complianceCount: ComplianceCount = inspectionsData.reduce(
    (acc, { complianceStandards }) => {
      if (complianceStandards) {
        acc[complianceStandards] = (acc[complianceStandards] || 0) + 1;
      }
      return acc;
    },
    {} as ComplianceCount
  );
  const rainbowColors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF24",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
    "#FF1493",
    "#00FFFF",
    "#FF00FF",
    "#1E90FF",
    "#32CD32",
  ];

  return (
    <div className="flex flex-row justify-center flex-wrap mt-2 bg-white rounded-lg shadow-lg p-2 gap-4">
      {Object.entries(complianceCount).map(
        ([compliance, count], index) =>
          count > 0 && (
            <div
              key={compliance}
              className="flex p-1 border-b-2 gap-2"
              style={{
                borderColor: rainbowColors[index % rainbowColors.length],
              }}
            >
              <span className="text-xs">{compliance.toUpperCase()}:</span>
              <span className="text-xs font-bold">{count}</span>
            </div>
          )
      )}
    </div>
  );
}
