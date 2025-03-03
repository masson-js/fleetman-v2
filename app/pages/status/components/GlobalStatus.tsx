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
    <div className="flex flex-row justify-around flex-wrap gap-4 mt-16 p-4 bg-blue-50 rounded-lg shadow-sm">
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <div className="flex items-end justify-end gap-1">
          <span className="text-4xl font-bold text-white">
            ${formattedProfit.value}
          </span>
          <span className="text-3xl font-bold text-white">
            {formattedProfit.suffix}
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Total Profit</h2>{" "}
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <span className="text-6xl font-bold text-white text-left">
          {shipCount}
        </span>{" "}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-white text-right">Ships</h2>{" "}
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <span className="text-6xl font-bold text-white  text-left">
          {inspectionsCount}
        </span>{" "}
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Inspections</h2>{" "}
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <span className="text-6xl font-bold text-white text-left">
          {certificationCount}
        </span>
        <div className="flex justify-center w-full">
          <h2 className="text-lg font-semibold text-white text-center">
            Certifications
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <span className="text-6xl font-bold text-white text-left">
          {fixturesCount}
        </span>{" "}
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Fixtures</h2>{" "}
        </div>
      </div>
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <span className="text-6xl font-bold text-white text-left">
          {totalLogbooks}
        </span>{" "}
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Logbooks</h2>{" "}
        </div>
      </div>
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <span className="text-6xl font-bold text-white text-left">
          {totalFuelRecords}
        </span>{" "}
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Fuel Records</h2>{" "}
        </div>
      </div>
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <span className="text-6xl font-bold text-white text-left">
          {totalRoutes}
        </span>{" "}
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Routes</h2>{" "}
        </div>
      </div>
    </div>
  );
}
