import { getAllLogbooks } from "@/actions/logbook";
import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";
import { Calendar, Ship, Anchor, FileText } from "lucide-react";

export default async function ShipCardLogbook() {
  const logbooks = (await getAllLogbooks()) || [];
  const userShips = (await getAllUserShips()) || [];

  return (
    <section className="flex flex-col w-auto justify-start max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Ship className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">Ships & Logbooks</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {userShips.map((ship) => {
          const shipLogbooks = logbooks.filter(
            (logbook) => logbook.shipId === ship.id
          );

          return (
            <div
              key={ship.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link href={`logbooks/ship/${ship.id}`}>
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
                  {shipLogbooks.length > 0 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {shipLogbooks.length} logbooks
                    </span>
                  )}
                </div>

                {shipLogbooks.length === 0 ? (
                  <p className="text-gray-500 italic mt-4 text-center py-6 bg-gray-50 rounded-lg">
                    No logbooks available for this ship
                  </p>
                ) : (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Recent Logbooks
                    </h3>
                    <div className="space-y-2">
                      {shipLogbooks.slice(0, 10).map((logbook) => (
                        <Link
                          key={logbook.id}
                          href={`/logbooks/logbook/${logbook.id}`}
                          className="block rounded-lg border border-gray-200 bg-gray-50 p-3 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {new Date(logbook.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 max-w-xs overflow-hidden text-ellipsis mx-6">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {logbook.operationType}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-8">
                              <span className="text-sm text-gray-600">
                                {logbook.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-8">
                              <span className="text-sm text-gray-600">
                                {logbook.responsible}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {shipLogbooks.length > 10 && (
                      <div className="mt-4 flex justify-end">
                        <Link
                          href={`/ships/${ship.id}/logbooks`}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          Show All Logbooks →
                        </Link>
                      </div>
                    )}
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