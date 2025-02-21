import { Ship } from "lucide-react";

interface ShipInfoProps {
  ship: {
    id: string;
    name: string;
    totalFixtures: number;
    totalInspections: number;
    totalRevenue: number;
  };
}

export function ShipInfo({ ship }: ShipInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Ship className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">{ship.name}</h2>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Фрахты:</span> {ship.totalFixtures}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Инспекции:</span> {ship.totalInspections}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Доход:</span> ${ship.totalRevenue.toFixed(2)}
        </p>
      </div>
    </div>
  );
}