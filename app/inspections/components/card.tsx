import { getAllInspections } from "@/actions/inspection";
import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";
import { Anchor, Calendar, User, Ship } from "lucide-react";

export default async function ShipCardInspection() {
  const inspections = (await getAllInspections()) || [];
  const userShips = (await getAllUserShips()) || [];

  const getBorderColor = (status: string): string => {
    switch (status) {
      case "passed":
        return "border-green-400 bg-green-50 hover:bg-green-100";
      case "requires-work":
        return "border-yellow-400 bg-yellow-50 hover:bg-yellow-100";
      case "failed":
        return "border-red-400 bg-red-50 hover:bg-red-100";
      default:
        return "border-blue-400 bg-blue-50";
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "passed":
        return "text-green-700 bg-green-100 border-green-200";
      case "requires-work":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "failed":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-blue-700 bg-blue-100 border-blue-200";
    }
  };

  return (
    <section className="flex flex-col w-auto justify-start max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Ship className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">
          Ships & Inspections
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {userShips.map((ship) => {
          const shipInspections = inspections.filter(
            (inspection) => inspection.shipId === ship.id
          );

          return (
            <div
              key={ship.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link href={`/status/${ship.id}`}>
                      <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                        {ship.name}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {ship.type}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Anchor className="w-4 h-4" />
                        <span className="text-sm">IMO: {ship.imoNumber}</span>
                      </div>
                    </div>
                  </div>
                  {shipInspections.length > 0 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {shipInspections.length} inspections
                    </span>
                  )}
                </div>

                {shipInspections.length === 0 ? (
                  <p className="text-gray-500 italic mt-4 text-center py-6 bg-gray-50 rounded-lg">
                    No inspections available for this ship
                  </p>
                ) : (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Recent Inspections
                    </h3>
                    <div className="space-y-2">
                      {shipInspections.map((inspection) => (
                        <Link
                          key={inspection.id}
                          href={`/inspections/${inspection.id}`}
                          className={`block rounded-lg ${getBorderColor(
                            inspection.verificationStatus
                          )} border p-3 hover:shadow-sm transition-shadow`}
                        >
                          <div className="flex items-center justify-between">
                         
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {new Date(
                                    inspection.inspectionDate
                                  ).toLocaleDateString("en-US", {
                                    day: "2-digit", // Делаем день с двумя цифрами
                                    month: "2-digit", // Делаем месяц с двумя цифрами
                                    year: "numeric", // Год без изменений
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 max-w-xs overflow-hidden text-ellipsis mx-6">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600 ">
                                  {inspection.inspectorName}
                                </span>
                              </div>
                            </div>

                            {/* Тип инспекции и статус */}
                            <div className="flex items-center gap-8">
                              <span className="text-sm text-gray-600">
                                {inspection.inspectionType}
                              </span>
                            </div>
                            <div className="flex items-center gap-8">
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium border mx-4 ${getStatusColor(
                                  inspection.verificationStatus
                                )}`}
                              >
                                {inspection.verificationStatus}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
