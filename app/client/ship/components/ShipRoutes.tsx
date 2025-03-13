"use client";

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
    <div className="col-span-1 border-[#57c4ff5f] border-2 border-solid rounded-lg p-4">
      <div className="flex items-center mb-2">
        <h2 className="text-sm font-bold text-gray-800">Recent Routes</h2>
      </div>

      {routes && routes.length > 0 ? (
        <div className="space-y-3">
          {routes.map((route) => (
            <div
              key={route.id}
              className="border-l-4 border-[#57C4FF] pl-3 py-2 hover:bg-[#57c4ff1a] transition-colors duration-300"
            >
              <div className="flex justify-between">
                <p className="font-medium text-xs">
                  {route.start} → {route.destination}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>
                  Departed: {new Date(route.date).toLocaleDateString()}
                </span>
                <span>
                  Arrival:{" "}
                  {new Date(route.arrivalDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No routes available.</p>
        </div>
      )}
    </div>
  );
}