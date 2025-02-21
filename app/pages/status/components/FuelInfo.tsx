interface FuelInfoProps {
  totalFuelConsumption: number;
  totalFuelCost: number;
}

export function FuelInfo({ totalFuelConsumption, totalFuelCost }: FuelInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Топливо</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Общее потребление:</span> {totalFuelConsumption.toFixed(2)} л
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Общая стоимость:</span> ${totalFuelCost.toFixed(2)}
        </p>
      </div>
    </div>
  );
}