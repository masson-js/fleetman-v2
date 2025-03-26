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
      <div className="bg-white shadow-md rounded-lg h-80 p-6 w-full max-w-4xl border-2 border-solid border-white hover:border-[#57C4FF] hover:border-2 hover:border-solid text-black  hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4">Logbooks</h2>
        <div className="space-y-3">
         

          <div className="flex items-center justify-between p-2 text-xs">
            <span>Recorded</span>
            <span className="font-semibold  ml-2">{inspectionsCount}</span>
          </div>

          <div className="flex items-center justify-between p-2 text-xs">
            <span className="">Ships Involved</span>
            <span className="font-semibold  ml-2">{uniqueShips}</span>
          </div>

          <div className="flex items-center justify-between p-2  text-xs">
            <span className="">Last Entry</span>
            <span className="font-semibold ml-2">
              {lastLogbook ? formatDate(lastLogbook.date) : 'No records'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2  rounded-md text-xs">
            <span className="">Last Location</span>
            <span className="font-semibold  ml-2">
              {lastLogbook?.location || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-md text-xs">
            <span className="">Last Event</span>
            <span className="font-semibold  ml-2">
              {lastLogbook?.eventDescription || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}