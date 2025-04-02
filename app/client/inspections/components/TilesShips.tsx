"use client";
import { useState } from "react";
import { Ship, Inspection } from "@/types";

interface UserShipsProps {
  userShips: Ship[];
  inspectionsData: Inspection[];
}

export default function TilesShips({ userShips, inspectionsData }: UserShipsProps) {
  const [sortBy, setSortBy] = useState<"mostFails" | "noInspections" | "recent" | "default">("default");
  
  // Группируем инспекции по shipId
  const inspectionsByShipId: Record<string, Inspection[]> = inspectionsData.reduce((acc, inspection) => {
    if (!acc[inspection.shipId]) {
      acc[inspection.shipId] = [];
    }
    acc[inspection.shipId].push(inspection);
    return acc;
  }, {} as Record<string, Inspection[]>);

  // Функция для анализа complianceStandards
  const analyzeComplianceStandards = (inspections: Inspection[]) => {
    const standards: Record<string, number> = {};
    
    inspections.forEach(inspection => {
      const standardsList = inspection.complianceStandards.split(',').map(s => s.trim());
      standardsList.forEach(standard => {
        standards[standard] = (standards[standard] || 0) + 1;
      });
    });
    
    return standards;
  };

  // Функция для подсчета неудачных инспекций
  const countFailedInspections = (inspections: Inspection[]) => {
    return inspections.filter(insp => 
      !insp.results.toLowerCase().includes('удовлетворительно')
    ).length;
  };

  // Подготовка данных для сортировки
  const preparedShips = userShips.map(ship => {
    const shipInspections = inspectionsByShipId[ship.id] || [];
    const lastInspection = shipInspections.length > 0 
      ? shipInspections[shipInspections.length - 1] 
      : null;
    
    return {
      ...ship,
      inspections: shipInspections,
      lastInspection,
      failedInspections: countFailedInspections(shipInspections),
      hasNoInspections: shipInspections.length === 0
    };
  });

  // Сортировка судов
  const sortedShips = [...preparedShips].sort((a, b) => {
    switch(sortBy) {
      case "mostFails":
        return b.failedInspections - a.failedInspections;
      case "noInspections":
        return (a.hasNoInspections === b.hasNoInspections) ? 0 : a.hasNoInspections ? -1 : 1;
      case "recent":
        if (!a.lastInspection && !b.lastInspection) return 0;
        if (!a.lastInspection) return 1;
        if (!b.lastInspection) return -1;
        return new Date(b.lastInspection.inspectionDate).getTime() - 
               new Date(a.lastInspection.inspectionDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="mt-20">
      {/* Панель фильтров */}
      <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
        <button 
          onClick={() => setSortBy("default")}
          className={`px-4 py-2 rounded-md ${sortBy === "default" ? 'bg-blue-600 text-white' : 'bg-white border'}`}
        >
          По умолчанию
        </button>
        <button 
          onClick={() => setSortBy("mostFails")}
          className={`px-4 py-2 rounded-md ${sortBy === "mostFails" ? 'bg-red-600 text-white' : 'bg-white border'}`}
        >
          Больше всего фейлов
        </button>
        <button 
          onClick={() => setSortBy("noInspections")}
          className={`px-4 py-2 rounded-md ${sortBy === "noInspections" ? 'bg-yellow-600 text-white' : 'bg-white border'}`}
        >
          Нет инспекций
        </button>
        <button 
          onClick={() => setSortBy("recent")}
          className={`px-4 py-2 rounded-md ${sortBy === "recent" ? 'bg-green-600 text-white' : 'bg-white border'}`}
        >
          Последняя инспекция
        </button>
      </div>

      {/* Список судов */}
      <div className="space-y-4">
        {sortedShips.map((ship) => {
          const { inspections, lastInspection } = ship;
          
          // Анализируем данные инспекций
          const euComplianceCount = inspections.filter(i => i.isEUCompliance).length;
          const verificationStatusCounts = inspections.reduce((acc, insp) => {
            acc[insp.verificationStatus] = (acc[insp.verificationStatus] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          const complianceStandards = analyzeComplianceStandards(inspections);

          return (
            <div 
              key={ship.id} 
              className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${
                ship.hasNoInspections ? 'border-l-4 border-yellow-500' : 
                ship.failedInspections > 0 ? 'border-l-4 border-red-500' : 
                inspections.length > 0 ? 'border-l-4 border-green-500' : ''
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Основная информация о судне */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{ship.name}</h3>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Тип:</span>
                    <span>{ship.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">IMO:</span>
                    <span>{ship.imoNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Инспекций:</span>
                    <span className="font-medium">{inspections.length}</span>
                    {ship.failedInspections > 0 && (
                      <span className="ml-2 text-red-600">({ship.failedInspections} фейлов)</span>
                    )}
                  </div>
                </div>

                {/* Статистика по инспекциям */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Статистика инспекций:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">EU Compliance:</span>
                      <span className="ml-2 font-medium">{euComplianceCount}</span>
                    </div>
                    {Object.entries(verificationStatusCounts).map(([status, count]) => (
                      <div key={status}>
                        <span className="text-gray-600">{status}:</span>
                        <span className="ml-2 font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Standards и последняя инспекция */}
                <div className="space-y-2">
                  <div>
                    <h4 className="font-semibold">Compliance Standards:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Object.entries(complianceStandards).map(([standard, count]) => (
                        <span 
                          key={standard} 
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                          title={`${standard}: ${count} раз`}
                        >
                          {standard}: {count}
                        </span>
                      ))}
                    </div>
                  </div>

                  {lastInspection ? (
                    <div className="mt-2">
                      <h4 className="font-semibold">Последняя инспекция:</h4>
                      <div className="text-sm">
                        <div>
                          <span className="text-gray-600">Дата:</span>
                          <span className="ml-2">{new Date(lastInspection.inspectionDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Тип:</span>
                          <span className="ml-2">{lastInspection.inspectionType}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Результат:</span>
                          <span className={`ml-2 font-medium ${
                            lastInspection.results.toLowerCase().includes('удовлетворительно') 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {lastInspection.results}
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