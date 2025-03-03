"use client";

import { ClipboardCheck, ClipboardX, Wrench, Globe, Ship } from "lucide-react";

interface Inspection {
  id: string;
  shipId: string;
  inspectionDate: Date;
  inspectorName: string;
  inspectionType: string;
  results: string;
  recommendations: string | null;
  nextInspectionDate: Date | null;
  inspectionReport: string | null;
  complianceStandards: string;
  deficienciesFound: string | null;
  correctiveActions: string | null;
  verificationStatus: "passed" | "failed" | "requires-work";
  duration: number | null;
  isEUCompliance: boolean;
}

interface InspectionsProps {
  inspections: Inspection[];
}

export default function InspectionsStatus({ inspections }: InspectionsProps) {
  const totalInspections = inspections.length;
  const passedCount = inspections.filter((insp) => insp.verificationStatus === "passed").length;
  const failedCount = inspections.filter((insp) => insp.verificationStatus === "failed").length;
  const requiresWorkCount = inspections.filter((insp) => insp.verificationStatus === "requires-work").length;
  const euComplianceCount = inspections.filter((insp) => insp.isEUCompliance).length;
  const uniqueShips = new Set(inspections.map((insp) => insp.shipId)).size;

  return (
    <div className="p-6 bg-blue-50">
      {/* Summary Container */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl hover:bg-[#57C4FF] hover:shadow-xl hover:cursor-pointer  transform transition-all duration-300 ">
        <h2 className=" text-lg font-semibold text-gray-800 mb-4">Inspection Summary</h2>
        <div className="space-y-3">
          {/* Total Inspections */}
          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-sm">
            <span className="flex items-center gap-2 text-blue-600">
              <Ship size={20} />
              Total Inspections
            </span>
            <span className="font-semibold text-blue-800">{totalInspections}</span>
          </div>
          {/* Passed Inspections */}
          <div className="flex items-center justify-between p-2 bg-green-100 rounded-md text-sm">
            <span className="flex items-center gap-2 text-green-600">
              <ClipboardCheck size={20} />
              Passed
            </span>
            <span className="font-semibold text-green-800">{passedCount}</span>
          </div>
          {/* Failed Inspections */}
          <div className="flex items-center justify-between p-2 bg-red-100 rounded-md text-sm">
            <span className="flex items-center gap-2 text-red-600">
              <ClipboardX size={20} />
              Failed
            </span>
            <span className="font-semibold text-red-800">{failedCount}</span>
          </div>
          {/* Requires Work Inspections */}
          <div className="flex items-center justify-between p-2 bg-yellow-100 rounded-md text-sm">
            <span className="flex items-center gap-2 text-yellow-600">
              <Wrench size={20} />
              Requires Work
            </span>
            <span className="font-semibold text-yellow-800">{requiresWorkCount}</span>
          </div>
          {/* EU Compliant Inspections */}
          <div className="flex items-center justify-between p-2 bg-purple-100 rounded-md text-sm">
            <span className="flex items-center gap-2 text-purple-600">
              <Globe size={20} />
              EU Compliant
            </span>
            <span className="font-semibold text-purple-800">{euComplianceCount}</span>
          </div>
          {/* Unique Ships Inspected */}
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-sm">
            <span className="flex items-center gap-2 text-gray-600">
              <Ship size={20} />
              Ships Inspected
            </span>
            <span className="font-semibold text-gray-800">{uniqueShips}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
