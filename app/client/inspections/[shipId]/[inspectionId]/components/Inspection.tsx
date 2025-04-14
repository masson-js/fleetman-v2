"use client";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Clock,
  FileCheck,
  Ship,
} from "lucide-react";

interface Inspection {
  id: string;
  shipId: string;
  inspectionDate: DateTime;
  inspectorName: string;
  inspectionType: string;
  results: string;
  recommendations: string | null;
  nextInspectionDate: DateTime | null;
  inspectionReport: string | null;
  complianceStandards: string;
  deficienciesFound: string | null;
  correctiveActions: string | null;
  verificationStatus: string;
  duration: number | null;
  isEUCompliance: boolean;
}

const complianceStandardsColors = {
  MARPOL: "#FF0000",
  SOLAS: "#FF7F00",
  ISO: "#FFFF24",
  AFS: "#00FF00",
  SEEMP: "#0000FF",
  EEDI: "#4B0082",
  ISM: "#9400D3",
  "MLC 2006": "#FF1493",
  STCW: "#00FFFF",
  IMDG: "#FF00FF",
  other: "#1E90FF",
};

// For compatibility with Prisma types
type DateTime = Date;

interface Props {
  inspection: Inspection;
}

export default function InspectionCard({ inspection }: Props) {
  // Date formatting
  const formatDate = (date: DateTime | null): string => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US");
  };

  const renderComplianceStandards = (standards: string) => {
    const standardsList = standards.split(",").map((s) => s.trim());

    return (
      <div className="flex flex-wrap gap-2">
        {standardsList.map((standard, index) => {
          const color =
            complianceStandardsColors[
              standard as keyof typeof complianceStandardsColors
            ] || complianceStandardsColors.other;
          return (
            <span
              key={index}
              className="text-xs"
              style={{ borderBottom: `2px solid ${color}` }}
            >
              {standard}
            </span>
          );
        })}
      </div>
    );
  };

  // Determine verification status and styling
  const getStatusInfo = () => {
    const status = inspection.verificationStatus.toLowerCase();

    if (
      status.includes("passed") ||
      status.includes("successful") ||
      status.includes("completed")
    ) {
      return {
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        bgColor: "bg-white",
        textColor: "text-green-800",
        borderColor: "border-green-200",
      };
    } else if (
      status.includes("failed") ||
      status.includes("rejected") ||
      status.includes("denied")
    ) {
      return {
        icon: <XCircle className="w-4 h-4" />,
        bgColor: "bg-white",
        textColor: "text-red-800",
        borderColor: "border-red-200",
      };
    } else {
      return {
        icon: <AlertTriangle className="w-4 h-4" />,
        bgColor: "bg-white",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200",
      };
    }
  };

  const statusInfo = getStatusInfo();

  // Duration formatting
  const formatDuration = (minutes: number | null): string => {
    if (!minutes) return "No information";

    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours} h ${remainingMinutes} min`
        : `${hours} h`;
    }
  };

  return (
    <div className="flex flex-col mt-4 animate-fade-in bg-blue-50 w-full sm:w-5/6 md:w-4/6 mx-auto rounded-lg">
      <div
        className={`flex items-center justify-start mb-2 shadow-lg rounded-lg ${statusInfo.bgColor} p-4 border-l-4 ${statusInfo.borderColor}`}
      >
        <div className="flex items-center">
          {statusInfo.icon}
          <span className={`text-xs ml-2 font-medium ${statusInfo.textColor}`}>
            {inspection.verificationStatus}
          </span>
        </div>

        <div className="text-xs bg-white bg-opacity-80 px-3 py-1 rounded-full">
          ID: {inspection.id.substring(0, 8)}
        </div>
        <div className="flex gap-2 text-xs">
          <button className="bg-blue-500 text-white px-2 py-1 rounded-lg">
            Preview
          </button>
          <button className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
            Download
          </button>
        </div>
      </div>

      {/* Main info */}
      <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <h1 className="text-lg font-bold text-gray-800 mb-1">
            {inspection.inspectionType}
          </h1>
        </div>

        {/* Inspection details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="flex flex-row items-center gap-2">
              <span className="text-xs text-gray-500">Inspector:</span>
              <span className="text-xs">{inspection.inspectorName}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-xs text-gray-500">Inspection Date:</span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-xs">
                  {formatDate(inspection.inspectionDate)}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="text-xs text-gray-500">Next Inspection:</span>
              <span className="text-xs">
                {inspection.nextInspectionDate
                  ? formatDate(inspection.nextInspectionDate)
                  : "No information"}
              </span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="flex flex-row items-center gap-2">
              <span className="text-xs text-gray-500">
                Compliance Standards:
              </span>
              {renderComplianceStandards(inspection.complianceStandards)}
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="text-xs text-gray-500">Duration:</span>
              <span className="text-xs">
                {formatDuration(inspection.duration)}
              </span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="text-xs text-gray-500">EU Compliance</span>
              <span
                className={` text-xs font-xs ${
                  inspection.isEUCompliance
                    ? " border-b-2 border-green-400"
                    : " text-gray-800"
                }`}
              >
                {inspection.isEUCompliance ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Additional info - always shown */}

      <div className="flex flex-col p-4 mt-2 bg-white gap-2 shadow-lg rounded-lg">
        <div className="flex  gap-2 my-2 text-xs">
          <h3 className=" mb-1 text-gray-500">Deficiencies Found:</h3>
          <p className="font-bold">
            {inspection.deficienciesFound || "No information"}
          </p>
        </div>

        <div className="flex  gap-2 my-2 text-xs">
          <h3 className=" mb-1 text-gray-500">Corrective Actions:</h3>
          <p className="font-bold">
            {inspection.correctiveActions || "No information"}
          </p>
        </div>

        <div className="flex  gap-2 my-2 text-xs">
          <h3 className=" mb-1 text-gray-500">Recommendations:</h3>
          <p className="font-bold">
            {inspection.recommendations || "No information"}
          </p>
        </div>

        <div className="flex  gap-2 my-2 text-xs">
          <h3 className=" mb-1 text-gray-500">Report:</h3>
          {inspection.inspectionReport ? (
            <a
              href={inspection.inspectionReport}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              <FileCheck className="w-4 h-4 mr-1" />
              Open Report
            </a>
          ) : (
            <p className="font-bold">No information</p>
          )}
        </div>
      </div>
    </div>
  );
}
