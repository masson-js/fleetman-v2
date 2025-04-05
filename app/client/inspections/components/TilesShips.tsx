"use client";
import { useState, useMemo } from "react";
import { Ship, Inspection } from "@/types";
import standartsColors from "@/public/lists/standartsColors.json";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
    <div className="mt-4 mb-10 w-auto h-auto">
      {/* Sorting panel */}

      <div className="flex flex-wrap items-baseline gap-4 mb-4 bg-white shadow-lg p-2 text-xs">
        <div className="flex items-baseline gap-3 ml-2">
          <span className="text-gray-500 border-r border-[#57C4FF] pr-2 h-[1.2em] flex items-center">
            Sort by
          </span>
          <div className="flex items-baseline gap-1">
            <button
              onClick={() => handleSort("mostFails")}
              className={`px-2 ${
                sortBy === "mostFails"
                  ? "border-b-2 border-[#e81416]"
                  : "border-b-2 border-transparent"
              }`}
            >
              fails
            </button>
            <button
              onClick={() => handleSort("noFails")}
              className={`px-2 hover:text-[#57C4FF] ${
                sortBy === "noFails"
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent"
              }`}
            ></button>
            <button
              onClick={() => handleSort("noInspections")}
              className={`px-2 hover:text-[#57C4FF] ${
                sortBy === "noInspections"
                  ? "border-b-2 border-yellow-500"
                  : "border-b-2 border-transparent"
              }`}
            >
              no records
            </button>
            <button
              onClick={() => handleSort("recent")}
              className={`px-2 hover:text-[#57C4FF] transition-all duration-200 ${
                sortBy === "recent"
                  ? "border-b-2 border-green-500"
                  : "border-b-2 border-transparent"
              }`}
            >
              last record
            </button>
          </div>
        </div>

        {/* Фильтрация */}
        <div className="flex items-baseline">
          <span className="text-gray-500 border-r border-[#57C4FF] pr-2 h-[1.2em] flex items-center">
            Standards
          </span>

          <div className="flex items-baseline flex-grow max-w-[200px] relative">
            <select
              value={standardFilter || ""}
              onChange={(e) => setStandardFilter(e.target.value || null)}
              className="w-full px-2 pl-5 bg-transparent appearance-none focus:outline-none cursor-pointer hover:text-[#57C4FF] transition-all duration-200"
            >
              <option className="" value="">
                All
              </option>
              {allStandards.map((standard) => (
                <option key={standard} value={standard}>
                  {standard}
                </option>
              ))}
            </select>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none">
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
              className="px-2 text-red-500 text-xs whitespace-nowrap"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Статистика */}
        <div className="flex items-baseline">
          <button
            className="flex items-baseline gap-1 text-xs cursor-pointer  transition-opacity"
            aria-label="Show statistic"
            onClick={() => {
              router.push("#analitics-section", { scroll: true });
            }}
          >
            <span className="text-gray-500 hover:text-[#57C4FF] transition-all duration-200">
              Analitics
            </span>
            <ChartNoAxesColumnIncreasing className="w-3.5 h-3.5 text-[#57C4FF] relative top-[0.1rem]" />
          </button>
        </div>
      </div>

      {/* SHip list */}

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
            <Link
              href={`/client/inspections/${ship.id}`}
              key={ship.id}
              className="block hover:cursor-pointer"
            >
              <div
                className={`bg-white shadow-md p-4 hover:shadow-xl transition-all duration-200 hover:bg-slate-50  ${
                  ship.hasNoInspections
                    ? "border-l-4 border-yellow-500"
                    : ship.failedInspections > 0
                    ? "border-l-4 border-red-500"
                    : "border-l-4 border-green-500"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {/* Основная информация о судне */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold inline-block border-b-2 border-[#57C4FF]">
                      {ship.name}
                    </h3>
                    <div className="flex items-center">
                      <span className=" text-gray-600  text-xs">
                        {ship.type}
                      </span>
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
                        No information about inspections
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
