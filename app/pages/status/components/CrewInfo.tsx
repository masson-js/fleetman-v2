interface CrewInfoProps {
  totalCrew: number;
  crewStatus: { active: number; onLeave: number; dismissed: number };
}

export function CrewInfo({ totalCrew, crewStatus }: CrewInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Экипаж</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Всего членов экипажа:</span> {totalCrew}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Активны:</span> {crewStatus.active}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">В отпуске:</span> {crewStatus.onLeave}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Уволены:</span> {crewStatus.dismissed}
        </p>
      </div>
    </div>
  );
}