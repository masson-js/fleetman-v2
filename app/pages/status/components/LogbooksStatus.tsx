"use client";

interface Logbook {
  id: string;
  shipId: string;
  date: Date;
  location: string;
  operationType: string;
  eventDescription: string;
  weatherConditions: string | null;
  seaConditions: string | null;
  speed: number | null;
  engineStatus: string | null;
  fuelConsumption: number | null;
  crewCount: number | null;
  inspectionCheck: boolean;
  responsible: string;
  notes: string | null;
}

interface LogbooksProps {
  logbooks: Logbook[];
}

export default function LogbooksStatus({ logbooks }: LogbooksProps) {
  const totalLogbooks = logbooks.length;
  const inspectionsCount = logbooks.filter((log) => log.inspectionCheck).length;
  const uniqueShips = new Set(logbooks.map((log) => log.shipId)).size;
  const lastLogbookDate =
    logbooks.length > 0
      ? new Date(
          Math.max(...logbooks.map((log) => new Date(log.date).getTime()))
        ).toISOString().split("T")[0]
      : "No records";

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl hover:bg-[#57C4FF] text-black hover:text-white hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4">Logbooks</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-xs">
            <span className="text-blue-600">Total Logbooks</span>
            <span className="font-semibold text-blue-800 ml-2">{totalLogbooks}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-green-100 rounded-md text-xs">
            <span className="text-green-600">Inspections Recorded</span>
            <span className="font-semibold text-green-800 ml-2">{inspectionsCount}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-xs">
            <span className="text-gray-600">Ships Involved</span>
            <span className="font-semibold text-gray-800 ml-2">{uniqueShips}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-purple-100 rounded-md text-xs">
            <span className="text-purple-600">Last Entry</span>
            <span className="font-semibold text-purple-800 ml-2">{lastLogbookDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
