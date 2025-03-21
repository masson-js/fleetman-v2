"use client";

import Link from "next/link";

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
  const passedCount = inspections.filter(
    (insp) => insp.verificationStatus === "passed"
  ).length;
  const failedCount = inspections.filter(
    (insp) => insp.verificationStatus === "failed"
  ).length;
  const requiresWorkCount = inspections.filter(
    (insp) => insp.verificationStatus === "requires-work"
  ).length;
  const euComplianceCount = inspections.filter(
    (insp) => insp.isEUCompliance
  ).length;
  const uniqueShips = new Set(inspections.map((insp) => insp.shipId)).size;

  return (
    <Link href="/client/inspections">
      <div className="">
        {/* Summary Container */}
        <div className="bg-white shadow-md rounded-lg h-full p-6 w-full max-w-4xl border-2  border-solid border-white hover:border-[#57C4FF] hover:border-2 hover:border-solid text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
          <h2 className="text-sm font-semibold mb-4">Inspections</h2>
          <div className="space-y-3">
            {/* Total Inspections */}

            {/* Passed Inspections */}
            <div className="flex items-center justify-between p-2 border-b-4 border-green-400  text-xs gap-4">
              <span className="">Passed</span>
              <span className="font-semibold ">
                {passedCount}
              </span>
            </div>
            {/* Failed Inspections */}
            <div className="flex items-center justify-between p-2 border-b-4 border-red-400  text-xs gap-4">
              <span className="">Failed</span>
              <span className="font-semibold ">{failedCount}</span>
            </div>
            {/* Requires Work Inspections */}
            <div className="flex items-center justify-between p-2 border-b-4 border-yellow-400  text-xs gap-4">
              <span className="">Requires Work</span>
              <span className="font-semibold ">
                {requiresWorkCount}
              </span>
            </div>
            {/* EU Compliant Inspections */}
            <div className="flex items-center justify-between p-2  rounded-md text-xs gap-4">
              <span className="">EU Compliant</span>
              <span className="font-semibold ">
                {euComplianceCount}
              </span>
            </div>
            {/* Unique Ships Inspected */}
            <div className="flex items-center justify-between p-2 rounded-md text-xs gap-4">
              <span className="">Inspected</span>
              <span className="font-semibold ">{uniqueShips}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}


