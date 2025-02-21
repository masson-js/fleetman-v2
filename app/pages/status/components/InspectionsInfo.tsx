interface InspectionsInfoProps {
  totalInspections: number;
  lastInspectionStatus: string;
}

export function InspectionsInfo({ totalInspections, lastInspectionStatus }: InspectionsInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Инспекции</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Всего инспекций:</span> {totalInspections}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Статус последней инспекции:</span> {lastInspectionStatus}
        </p>
      </div>
    </div>
  );
}