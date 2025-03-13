"use client";

interface ShipProps {
  ship: any;
}

export default function ShipDetailsSection({ ship }: ShipProps) {
  return (
    <div className="col-span-1 bg-white border-[#57c4ff5f] border-2 border-solid rounded-lg p-4">
      <div className="flex items-center mb-2">
        <h2 className="text-sm font-bold text-gray-800">Vessel Information</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-thin text-gray-600 mb-3 border-b pb-2 border-[#57C4FF]">
            Physical Specifications
          </h3>
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-xs text-gray-500">Year Built:</span>
            <span className="text-xs font-medium">{ship.yearBuilt}</span>
            <span className="text-xs text-gray-500">Deadweight:</span>
            <span className="text-xs font-medium">{ship.deadweight} t</span>
            <span className="text-xs text-gray-500">Length:</span>
            <span className="text-xs font-medium">{ship.length} m</span>
            <span className="text-xs text-gray-500">Beam:</span>
            <span className="text-xs font-medium">{ship.beam} m</span>
            <span className="text-xs text-gray-500">Width:</span>
            <span className="text-xs font-medium">{ship.width} m</span>
          </div>
        </div>

        {/* Environmental Section */}
        <div>
          <h3 className="text-sm font-thin text-gray-600 mb-3 border-b pb-2 border-[#57C4FF]">
            Environmental
          </h3>
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-xs text-gray-500">ECO Standard:</span>
            <span className="text-xs font-medium">{ship.ecoStandard}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
