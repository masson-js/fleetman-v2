'use client';

interface LogbookEntry {
  id: string;
  operationType: string;
  date: Date;
  eventDescription: string;
  location: string;
  weatherConditions: string | null;
  seaConditions: string | null;
  speed: number | null;
  responsible: string;
  inspectionCheck: boolean;
}

interface LogbookProps {
  logbooks: LogbookEntry[];
}

export default function ShipLogbooks({ logbooks }: LogbookProps) {
  return (
    <div className="flex animate-fade-in flex-col bg-white w-4/6 mx-auto mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800">Recent Logbook Entries</h2>
      </div>

      {logbooks && logbooks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-white text-black text-xs border-b-4 border-[#57c4ff5b]">
              <tr>
                <th className="p-3 text-left">Operation</th>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Weather</th>
                <th className="p-3 text-left">Sea Conditions</th>
                <th className="p-3 text-left">Speed</th>
                <th className="p-3 text-left">Responsible</th>
                <th className="p-3 text-left">Inspection</th>
              </tr>
            </thead>
            <tbody>
              {logbooks.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                    index === logbooks.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  <td className="p-3 text-xs whitespace-nowrap">{entry.operationType}</td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {new Date(entry.date).toLocaleDateString('en-US')}{" "}
                    {new Date(entry.date).toLocaleTimeString('en-US')}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">{entry.location}</td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {entry.weatherConditions || 'N/A'}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {entry.seaConditions || 'N/A'}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {entry.speed ? `${entry.speed} knots` : 'N/A'}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">{entry.responsible}</td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {entry.inspectionCheck ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No logbook entries available.</p>
        </div>
      )}
    </div>
  );
}
