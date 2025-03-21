interface StatusListProps {
  shipCount: number;
  inspectionsCount: number;
  certificationCount: number;
  fixturesCount: number;
  totalProfit: number;
  totalLogbooks: number;
  totalFuelRecords: number;
  totalRoutes: number;
}

export default function GlobalStatus({
  shipCount,
  inspectionsCount,
  certificationCount,
  fixturesCount,
  totalProfit,
  totalLogbooks,
  totalFuelRecords,
  totalRoutes,
}: StatusListProps) {
  const formatNumber = (totalProfit: number) => {
    if (totalProfit >= 1_000_000) {
      return {
        value: (totalProfit / 1_000_000).toFixed(2), // Число (например, 1.23)
        suffix: "M", // Суффикс (например, M)
      };
    } else if (totalProfit >= 1000) {
      return {
        value: (totalProfit / 1000).toFixed(0), // Число (например, 786)
        suffix: "K", // Суффикс (например, K)
      };
    } else {
      return {
        value: totalProfit.toFixed(2),
        suffix: "",
      };
    }
  };

  const formattedProfit = formatNumber(totalProfit);

  return (
    <div className="flex flex-row justify-between flex-wrap gap-4 mt-24 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col justify-center p-4 w-auto h-auto bg-gradient-to-b from-[#57C4FF] to-[#57C4FF] rounded-s-lg transform transition-all">
        <div className="flex flex-wrap gap-2 justify-center">
          <h2 className="text-sm font-extralight text-white">Total Profit</h2>
        </div>
        <div className="flex gap-1">
          <span className="text-2xl font-mono text-white">
            ${formattedProfit.value}
          </span>
          <span className="text-2xl font-thin text-white">
            {formattedProfit.suffix}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 w-auto h-auto">
        <div className="flex items-center gap-2">
          <h2 className="font-light text-center text-sm">Ships</h2>
        </div>
        <span className="text-xl font-thin text-center">{shipCount}</span>
      </div>

      <div className="flex flex-col justify-between p-4 w-auto h-auto">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-sm font-thin text-center">Inspections</h2>
        </div>
        <span className="text-xl font-thin text-center">{inspectionsCount}</span>
      </div>

      <div className="flex flex-col justify-between p-4 w-auto h-auto">
        <div className="flex justify-center w-full">
          <h2 className="text-sm font-thin text-center">Certifications</h2>
        </div>
        <span className="text-xl font-thin text-center">{certificationCount}</span>
      </div>

      <div className="flex flex-col justify-between p-4 w-auto h-auto">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-sm font-thin text-center">Fixtures</h2>
        </div>
        <span className="text-xl font-thin text-center">{fixturesCount}</span>
      </div>

      <div className="flex flex-col justify-between p-4 w-auto h-auto">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-sm text-center">Logbooks</h2>
        </div>
        <span className="text-xl font-thin text-center">{totalLogbooks}</span>
      </div>

      <div className="flex flex-col justify-between p-4 w-auto h-auto">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-sm font-thin text-center">Fuel Records</h2>
        </div>
        <span className="text-xl font-thin text-center">{totalFuelRecords}</span>
      </div>

      <div className="flex flex-col justify-between p-4 w-auto h-auto">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-sm font-thin text-center">Routes</h2>
        </div>
        <span className="text-xl font-thin text-center">{totalRoutes}</span>
      </div>
    </div>
  );
}
