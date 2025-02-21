interface FixturesInfoProps {
  totalFixtures: number;
  totalRevenue: number;
}

export function FixturesInfo({ totalFixtures, totalRevenue }: FixturesInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Фрахты</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Всего фрахтов:</span> {totalFixtures}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Общий доход:</span> ${totalRevenue.toFixed(2)}
        </p>
      </div>
    </div>
  );
}