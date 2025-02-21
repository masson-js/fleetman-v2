import WaveIcon from "@/app/components/waveicon";
import { Ship, ClipboardCheck } from "lucide-react";

interface StatusListProps {
  shipCount: number;
  inspectionsCount: number;
  certificationCount: number;
  fixturesCount: number;
  totalProfit: number;
}

export default function GlobalStatus({
  shipCount,
  inspectionsCount,
  certificationCount,
  fixturesCount,
  totalProfit,
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
        value: totalProfit.toFixed(2), // Число (например, 500.00)
        suffix: "", // Без суффикса
      };
    }
  };

  const formattedProfit = formatNumber(totalProfit); // Вызываем функцию и сохраняем результат

  return (
    <div className="flex flex-row flex-wrap gap-4 p-4 bg-blue-50 rounded-lg shadow-sm">
      {/* Блок Ships */}
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-white">Ships</h2>{" "}
        </div>
        <span className="text-6xl font-bold text-white text-right">
          {shipCount}
        </span>{" "}
      </div>

      {/* Блок Inspections */}
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Inspections</h2>{" "}
        </div>
        <span className="text-6xl font-bold text-white text-right">
          {inspectionsCount}
        </span>{" "}
      </div>

      {/* Блок Certifications */}
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Certifications</h2>{" "}
        </div>
        <span className="text-6xl font-bold text-white text-right">
          {certificationCount}
        </span>{" "}
      </div>

      {/* Блок Fixtures */}
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Fixtures</h2>{" "}
        </div>
        <span className="text-6xl font-bold text-white text-right">
          {fixturesCount}
        </span>{" "}
      </div>

      {/* Блок Total Profit */}
      <div className="flex flex-col justify-between p-6 w-36 h-36 bg-gradient-to-b from-[#57C4FF] to-[#09A9FF] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">Total Profit</h2>{" "}
        </div>
        <div className="flex items-end justify-end gap-1">
          <span className="text-4xl font-bold text-white">
            ${formattedProfit.value}
          </span>
          <span className="text-2xl font-bold text-white">
            {formattedProfit.suffix}
          </span>
        </div>
      </div>
    </div>
  );
}