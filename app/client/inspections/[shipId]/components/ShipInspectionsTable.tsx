"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SortControls from "./SortControls";

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
  verificationStatus: string;
  duration: number | null;
  isEUCompliance: boolean;
}

interface ShipInspectionsProps {
  inspections: Inspection[];
}

// Цвета для стандартов
const standardsColorMap: Record<string, string> = {
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

export default function ShipInspectionsTable({
  inspections,
}: ShipInspectionsProps) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Inspection;
    direction: "ascending" | "descending";
  }>({ key: "inspectionDate", direction: "ascending" });

  const handleSortChange = (key: string, direction: "ascending" | "descending") => {
    setSortConfig({ key: key as keyof Inspection, direction });
  };

  const getSortedInspections = () => {
    return [...inspections].sort((a, b) => {
      // Для дат
      if (sortConfig.key === "inspectionDate" || sortConfig.key === "nextInspectionDate") {
        const dateA = new Date(a[sortConfig.key] || 0).getTime();
        const dateB = new Date(b[sortConfig.key] || 0).getTime();
        return sortConfig.direction === "ascending" ? dateA - dateB : dateB - dateA;
      }

      // Для чисел
      if (sortConfig.key === "duration") {
        const numA = a[sortConfig.key] || 0;
        const numB = b[sortConfig.key] || 0;
        return sortConfig.direction === "ascending" ? numA - numB : numB - numA;
      }

      // Для булевых значений
      if (sortConfig.key === "isEUCompliance") {
        return sortConfig.direction === "ascending"
          ? Number(a.isEUCompliance) - Number(b.isEUCompliance)
          : Number(b.isEUCompliance) - Number(a.isEUCompliance);
      }

      // Для строк
      const valueA = String(a[sortConfig.key] ?? "");
      const valueB = String(b[sortConfig.key] ?? "");
      
      if (valueA < valueB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedInspections = getSortedInspections();

  return (
    <div className="w-4/6 flex animate-fade-in flex-col bg-white max-w-7xl mx-auto mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-800 border-b-2 border-[#ffa500]">
          Inspections
        </h2>
        <SortControls 
          onSortChange={handleSortChange} 
          currentSort={sortConfig} 
        />
      </div>

      {sortedInspections && sortedInspections.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white text-xs">
            <thead className="bg-white text-black border-b-4 border-[#57c4ff5b]">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Inspector</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Standards</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">EU Compliant</th>
                <th className="p-3 text-left">Recomend.</th>
                <th className="p-3 text-left">Deficiencies</th>
                <th className="p-3 text-left">Corrective Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Остальная часть таблицы без изменений */}
              {sortedInspections.map((inspection, index) => {
                const standardColor =
                  standardsColorMap[inspection.complianceStandards] ||
                  standardsColorMap["other"];

                const durationStr = inspection.duration
                  ? inspection.duration < 60
                    ? `${inspection.duration} min`
                    : `${Math.floor(inspection.duration / 60)}h ${
                        inspection.duration % 60
                          ? `${inspection.duration % 60}m`
                          : ""
                      }`
                  : "No";

                const getPresence = (value: string | null) =>
                  value && value.trim() !== "" ? "include" : "none";

                return (
                  <tr
                    key={inspection.id}
                    onClick={() =>
                      router.push(
                        `/client/inspections/${inspection.shipId}/${inspection.id}`
                      )
                    }
                    className={`cursor-pointer transition-colors duration-300 hover:bg-[#e8f4fb] ${
                      index === inspections.length - 1 ? "rounded-b-lg" : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap">
                      {new Date(inspection.inspectionDate).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {inspection.inspectorName}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 font-semibold rounded-full ${
                          inspection.inspectionType === "regular"
                            ? " text-blue-800"
                            : inspection.inspectionType === "unscheduled"
                            ? " text-orange-800"
                            : inspection.inspectionType === "follow-up"
                            ? " text-purple-800"
                            : " text-gray-800"
                        }`}
                      >
                        {inspection.inspectionType}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className="inline-block pb-0.5"
                        style={{
                          boxShadow: `inset 0 -2px 0 0 ${standardColor}`,
                        }}
                      >
                        {inspection.complianceStandards}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">{durationStr}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 font-semibold rounded-full ${
                          inspection.verificationStatus === "passed"
                            ? " text-green-500"
                            : inspection.verificationStatus === "requires-work"
                            ? " text-yellow-500"
                            : inspection.verificationStatus === "failed"
                            ? " text-red-500"
                            : " text-gray-800"
                        }`}
                      >
                        {inspection.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {inspection.isEUCompliance ? "Yes" : "No"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {getPresence(inspection.recommendations)}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {getPresence(inspection.deficienciesFound)}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {getPresence(inspection.correctiveActions)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No inspection records available.</p>
        </div>
      )}
    </div>
  );
}