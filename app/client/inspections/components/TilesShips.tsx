"use client";
import { useState, useMemo } from "react";
import { Ship, Inspection } from "@/types";
import standartsColors from "@/public/lists/standartsColors.json";

interface UserShipsProps {
  userShips: Ship[];
  inspectionsData: Inspection[];
}

export default function TilesShips({
  userShips,
  inspectionsData,
}: UserShipsProps) {
  const [sortBy, setSortBy] = useState<
    "mostFails" | "noInspections" | "recent" | "noFails" | "default"
  >("default");
  const [standardFilter, setStandardFilter] = useState<string | null>(null);

  // Обработчики сортировки, которые также сбрасывают фильтр
  const handleSort = (type: typeof sortBy) => {
    setSortBy(type);
    setStandardFilter(null); // Сбрасываем фильтр при выборе сортировки
  };

  // Получаем все уникальные стандарты из инспекций
  const allStandards = useMemo(() => {
    const standards = new Set<string>();
    inspectionsData.forEach((inspection) => {
      inspection.complianceStandards
        .split(",")
        .map((s) => s.trim())
        .forEach((standard) => standards.add(standard));
    });
    return Array.from(standards).sort();
  }, [inspectionsData]);

  // Группируем инспекции по shipId
  const inspectionsByShipId = useMemo(
    () =>
      inspectionsData.reduce((acc, inspection) => {
        if (!acc[inspection.shipId]) acc[inspection.shipId] = [];
        acc[inspection.shipId].push(inspection);
        return acc;
      }, {} as Record<string, Inspection[]>),
    [inspectionsData]
  );

  // Подготовка данных для сортировки
  const preparedShips = useMemo(
    () =>
      userShips.map((ship) => {
        const shipInspections = inspectionsByShipId[ship.id] || [];
        const lastInspection =
          shipInspections[shipInspections.length - 1] || null;

        return {
          ...ship,
          inspections: shipInspections,
          lastInspection,
          failedInspections: shipInspections.filter(
            (insp) => insp.verificationStatus.toLowerCase() === "failed"
          ).length,
          requiresWorkInspections: shipInspections.filter(
            (insp) => insp.verificationStatus.toLowerCase() === "requires-work"
          ).length,
          passedInspections: shipInspections.filter(
            (insp) => insp.verificationStatus.toLowerCase() === "passed"
          ).length,
          hasNoInspections: shipInspections.length === 0,
        };
      }),
    [userShips, inspectionsByShipId]
  );

  // Фильтрация судов по стандарту
  const filteredShips = useMemo(() => {
    if (!standardFilter) return preparedShips;

    return preparedShips.filter((ship) =>
      ship.inspections.some((inspection) =>
        inspection.complianceStandards
          .split(",")
          .map((s) => s.trim())
          .includes(standardFilter)
      )
    );
  }, [preparedShips, standardFilter]);

  // Сортировка судов
  const sortedShips = useMemo(() => {
    return [...filteredShips].sort((a, b) => {
      switch (sortBy) {
        case "mostFails":
          return b.failedInspections - a.failedInspections;
        case "noInspections":
          return a.hasNoInspections ? -1 : 1;
        case "recent":
          if (!a.lastInspection) return 1;
          if (!b.lastInspection) return -1;
          return (
            new Date(b.lastInspection.inspectionDate).getTime() -
            new Date(a.lastInspection.inspectionDate).getTime()
          );
        case "noFails":
          // Сначала идут суда без failed инспекций
          return a.failedInspections === 0 && b.failedInspections > 0
            ? -1
            : a.failedInspections > 0 && b.failedInspections === 0
            ? 1
            : 0;
        default:
          return 0;
      }
    });
  }, [filteredShips, sortBy]);

  return (
    <div className="mt-4 w-auto h-auto">
      {/* Панель фильтрации по стандартам */}

      {/* Панель сортировки */}
      <div className="flex items-center gap-3 mb-4 bg-white shadow-lg p-2 text-xs">
        <span className="text-gray-500 border-r-2 border-[#57C4FF] pr-2">
          Sort by
        </span>
        <button
          onClick={() => handleSort("mostFails")}
          className={`px-2 py-1 ${
            sortBy === "mostFails"
              ? "border-b-2 border-[#e81416]"
              : "border-b-2 border-transparent"
          }`}
        >
          fails
        </button>
        <button
          onClick={() => handleSort("noFails")}
          className={`px-2 py-1 ${
            sortBy === "noFails"
              ? "border-b-2 border-blue-500"
              : "border-b-2 border-transparent"
          }`}
        >
          no fails
        </button>
        <button
          onClick={() => handleSort("noInspections")}
          className={`px-2 py-1 ${
            sortBy === "noInspections"
              ? "border-b-2 border-yellow-500"
              : "border-b-2 border-transparent"
          }`}
        >
          no records
        </button>
        <button
          onClick={() => handleSort("recent")}
          className={`px-2 py-1 ${
            sortBy === "recent"
              ? "border-b-2 border-green-500"
              : "border-b-2 border-transparent"
          }`}
        >
          last record
        </button>

        <span className="text-gray-500 border-r-2 border-[#57C4FF] pr-2">
          Filter by standard
        </span>
        <div className="relative flex-grow max-w-[200px] border-b-2 border-[#57C4FF]">
          <select
            value={standardFilter || ""}
            onChange={(e) => setStandardFilter(e.target.value || null)}
            className="w-full px-2 py-1 bg-transparent appearance-none focus:outline-none"
          >
            <option value="">All standards</option>
            {allStandards.map((standard) => (
              <option key={standard} value={standard}>
                {standard}
              </option>
            ))}
          </select>
          {/* Кастомная стрелка селекта */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {standardFilter && (
          <button
            onClick={() => setStandardFilter(null)}
            className="px-2 py-1 text-red-500 text-xs whitespace-nowrap"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Список судов */}
      <div className="space-y-4">
        {sortedShips.map((ship) => {
          const complianceStandards = ship.inspections.reduce(
            (acc, inspection) => {
              inspection.complianceStandards
                .split(",")
                .map((s) => s.trim())
                .forEach((standard) => {
                  acc[standard] = (acc[standard] || 0) + 1;
                });
              return acc;
            },
            {} as Record<string, number>
          );

          return (
            <div
              key={ship.id}
              className={`bg-white shadow-md p-4 hover:shadow-lg ${
                ship.hasNoInspections
                  ? "border-l-4 border-yellow-500"
                  : ship.failedInspections > 0
                  ? "border-l-4 border-red-500"
                  : "border-l-4 border-green-500"
              }`}
            >
              {/* Остальной код остается без изменений */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Основная информация о судне */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold inline-block border-b-2 border-[#57C4FF]">
                    {ship.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-xs">{ship.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-xs">IMO:</span>
                    <span className="text-xs">{ship.imoNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 text-xs mr-2">
                      Inspections:
                    </span>
                    <span className="text-xs">{ship.inspections.length}</span>
                  </div>
                </div>

                {/* Статистика по инспекциям */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs">Statistics</h4>
                  <div className="flex flex-col flex-wrap text-xs ">
                    <div>
                      <span className="text-gray-600">EU Compliance:</span>
                      <span className="ml-2 ">
                        {
                          ship.inspections.filter((i) => i.isEUCompliance)
                            .length
                        }
                      </span>
                    </div>
                    {Object.entries(
                      ship.inspections.reduce((acc, insp) => {
                        acc[insp.verificationStatus] =
                          (acc[insp.verificationStatus] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([status, count]) => (
                      <div key={status}>
                        <span className="text-gray-600">{status}:</span>
                        <span className="ml-2 ">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Standards и последняя инспекция */}
                <div className="space-y-2 text-xs">
                  <div>
                    <h4 className="font-semibold">Compliance Standards</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Object.entries(complianceStandards).map(
                        ([standard, count]) => (
                          <span
                            key={standard}
                            className="text-xs px-2 py-1 mr-1 mb-1 inline-block text-black"
                            style={{
                              borderBottom: `2px solid ${
                                (
                                  standartsColors.complianceStandards as Record<
                                    string,
                                    string
                                  >
                                )[standard] || "#1E90FF"
                              }`,
                            }}
                            title={`${standard}: ${count} раз`}
                          >
                            {standard}: {count}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {ship.lastInspection ? (
                    <div className="mt-2 text-xs">
                      <h4 className="font-semibold">Last inspection:</h4>
                      <div className="">
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="ml-2">
                            {
                              new Date(ship.lastInspection.inspectionDate)
                                .toISOString()
                                .split("T")[0]
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2">
                            {ship.lastInspection.inspectionType}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <span
                            className={`ml-2 font-medium ${
                              ship.lastInspection.verificationStatus.toLowerCase() ===
                              "passed"
                                ? "text-green-600"
                                : ship.lastInspection.verificationStatus.toLowerCase() ===
                                  "requires-work"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {ship.lastInspection.verificationStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-yellow-600 font-medium">
                      Нет данных об инспекциях
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
