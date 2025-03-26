'use client';

interface Route {
  id: string;
  shipId: string;
  date: Date;
  start: string;
  destination: string;
  arrivalDate: Date;
}

interface ShipRoutesProps {
  routes: Route[];
}

export default function ShipRoutes({ routes }: ShipRoutesProps) {
  return (
    <div className="flex animate-fade-in flex-col bg-white w-4/6 mx-auto mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-[#4400ff]">Recent Routes</h2>
      </div>

      {routes && routes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-white text-black text-xs border-b-4 border-[#57c4ff5b]">
              <tr>
                <th className="p-3 text-left">Route</th>
                <th className="p-3 text-left">Departure Date</th>
                <th className="p-3 text-left">Arrival Date</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr
                  key={route.id}
                  className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                    index === routes.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  <td className="p-3 text-xs whitespace-nowrap">
                    <div className="font-medium">
                      {route.start} → {route.destination}
                    </div>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {new Date(route.date).toLocaleDateString('en-US')}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {new Date(route.arrivalDate).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No routes available.</p>
        </div>
      )}
    </div>
  );
}
