"use client";

interface ShipProps {
  ship: any;
}

type ShipStatus = "in port" | "on the way" | "waiting" | "fix" | "other";

export default function ShipTitle({ ship }: ShipProps) {
  const getStatusClass = (status: string): string => {
    const statusMap: Record<ShipStatus, string> = {
      "in port": "bg-green-500 text-white",
      "on the way": "bg-blue-500 text-white",
      waiting: "bg-yellow-500 text-white",
      fix: "bg-red-500 text-white",
      other: "bg-gray-500 text-white",
    };

    return (status as ShipStatus) in statusMap
      ? statusMap[status as ShipStatus]
      : "bg-gray-300 text-black";
  };

  return (
    <div className="flex mt-24 p-4   shadow-lg bg-white text-black text-xs border-b-4 border-[#57c4ff5b] rounded-t-lg">
      <div className="flex flex-col md:flex-row items-center gap-4 ">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            className="w-full h-full object-cover"
            src="/output.jpg"
            alt={ship.name}
          />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div>
            <h1 className="text-xl font-bold text-black transition-colors duration-300">
              {ship.name}
            </h1>
            <div className="flex items-center mt-2 space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-thin ${getStatusClass(
                  ship.currentStatus
                )}`}
              >
                {ship.currentStatus}
              </span>
              <span className="flex items-center text-xs font-thin">
                {ship.type}
              </span>
              <span className="flex items-center text-xs font-thin">
                {ship.portOfRegistry}, {ship.flag}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">IMO Number:</span>
                <span className="text-xs font-medium">{ship.imoNumber}</span>
                <span className="text-xs text-gray-500">MMSI:</span>
                <span className="text-xs font-medium">{ship.mmsi}</span>
                <span className="text-xs text-gray-500">Callsign:</span>
                <span className="text-xs font-medium">{ship.callsign}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
