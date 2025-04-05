"use client";

import { Inspection } from "@/types";

interface InformationBarProps {
  inspectionsData: Inspection[];
}

type StatusCount = {
  passed: number;
  "requires-work": number;
  failed: number;
};

type TypeCount = {
  scheduled: number;
  "follow-up": number;
  unscheduled: number;
};

type ComplianceCount = Record<string, number>;

export default function InformationBar({
  inspectionsData,
}: InformationBarProps) {
  const countInspectionsData = inspectionsData.length;

  const statusCount: StatusCount = inspectionsData.reduce(
    (acc, { verificationStatus }) => {
      if (verificationStatus === "passed") {
        acc.passed += 1;
      } else if (verificationStatus === "requires-work") {
        acc["requires-work"] += 1;
      } else if (verificationStatus === "failed") {
        acc.failed += 1;
      }
      return acc;
    },
    { passed: 0, "requires-work": 0, failed: 0 }
  );

  const typeCount: TypeCount = inspectionsData.reduce(
    (acc, { inspectionType }) => {
      if (inspectionType === "scheduled") {
        acc.scheduled += 1;
      } else if (inspectionType === "follow-up") {
        acc["follow-up"] += 1;
      } else if (inspectionType === "unscheduled") {
        acc.unscheduled += 1;
      }
      return acc;
    },
    { scheduled: 0, "follow-up": 0, unscheduled: 0 }
  );

  const complianceCount: ComplianceCount = inspectionsData.reduce(
    (acc, { complianceStandards }) => {
      if (complianceStandards) {
        acc[complianceStandards] = (acc[complianceStandards] || 0) + 1;
      }
      return acc;
    },
    {} as ComplianceCount
  );

  const euComplianceCounts = {
    EU: inspectionsData.filter(({ isEUCompliance }) => isEUCompliance).length,
    NonEU: inspectionsData.filter(({ isEUCompliance }) => !isEUCompliance)
      .length,
  };

  return (
    <div className="flex flex-row justify-start flex-wrap mt-20 bg-white rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none shadow-lg ">
      <div className="flex flex-col justify-center p-2 w-auto h-auto bg-gradient-to-b from-[#57C4FF] to-[#57C4FF] rounded-tl-lg rounded-tr-none rounded-bl-none rounded-br-none ">
        <div className="flex flex-wrap gap-2 justify-center w-auto">
          <h2 className="text-sm font-extralight text-white">
            Total Inspections
          </h2>
        </div>
        <div className="flex justify-center">
          <span className="text-2xl font-mono text-white">
            {countInspectionsData}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center p-2 w-auto h-auto gap-1 ">
        <div className="flex justify-between border-b-2 border-green-300 pb-1 gap-2">
          <span className="text-xs">Passed:</span>
          <span className="text-xs">{statusCount.passed}</span>
        </div>
        <div className="flex justify-between border-b-2 border-yellow-300 pb-1 gap-2">
          <span className="text-xs">Requires work:</span>
          <span className="text-xs">{statusCount["requires-work"]}</span>
        </div>
        <div className="flex justify-between border-b-2 border-red-300 pb-1 gap-2">
          <span className="text-xs">Failed:</span>
          <span className="text-xs">{statusCount.failed}</span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-2 w-auto h-auto gap-1">
        <div className="flex justify-between border-b-2 border-blue-300 pb-1 gap-2">
          <span className="text-xs">Scheduled:</span>
          <span className="text-xs">{typeCount.scheduled}</span>
        </div>
        <div className="flex justify-between border-b-2 border-blue-300 pb-1 gap-2">
          <span className="text-xs">Follow-up:</span>
          <span className="text-xs">{typeCount["follow-up"]}</span>
        </div>
        <div className="flex justify-between border-b-2 border-blue-300 pb-1 gap-2">
          <span className="text-xs">Unscheduled:</span>
          <span className="text-xs">{typeCount.unscheduled}</span>
        </div>
      </div>

      <div className="flex flex-col justify-start p-2 w-auto h-auto gap-1">
        <div className="flex p-1 justify-between border-b-2 border-blue-300 pb-1 gap-2">
          <span className="text-xs">🇪🇺 EU Standard Compliance:</span>
          <span className="text-xs">{euComplianceCounts.EU}</span>
        </div>
      </div>
    </div>
  );
}
