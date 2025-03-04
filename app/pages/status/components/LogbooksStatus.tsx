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
  
  // Find the last logbook entry
  const lastLogbook = logbooks.length > 0
    ? logbooks.reduce((latest, current) => 
        (new Date(latest.date) > new Date(current.date) ? latest : current)
      )
    : null;

  // Consistent date formatting to avoid hydration issues
  const formatDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-6 w-full hover:bg-[#57C4FF] text-black hover:text-white hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4">Logbooks</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-xs">
            <span className="text-blue-600">Total</span>
            <span className="font-semibold text-blue-800 ml-2">{totalLogbooks}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-green-100 rounded-md text-xs">
            <span className="text-green-600">Recorded</span>
            <span className="font-semibold text-green-800 ml-2">{inspectionsCount}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-xs">
            <span className="text-gray-600">Ships Involved</span>
            <span className="font-semibold text-gray-800 ml-2">{uniqueShips}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-purple-100 rounded-md text-xs">
            <span className="text-purple-600">Last Entry</span>
            <span className="font-semibold text-purple-800 ml-2">
              {lastLogbook ? formatDate(lastLogbook.date) : 'No records'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-yellow-100 rounded-md text-xs">
            <span className="text-yellow-600">Last Location</span>
            <span className="font-semibold text-yellow-800 ml-2">
              {lastLogbook?.location || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-red-100 rounded-md text-xs">
            <span className="text-red-600">Last Event</span>
            <span className="font-semibold text-red-800 ml-2">
              {lastLogbook?.eventDescription || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}