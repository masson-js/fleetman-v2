import { getShipDetails } from "@/actions/ship";
import {
  InspectionEnhancedButton,
  UniversalRouterButton,
} from "@/app/components/buttons";
import Header from "@/app/components/Header";

import ShipDetailsSection from "../components/ShipDatails";
import ShipCrew from "../components/ShipCrew";
import ShipTitle from "../components/ShipTitle";
import ShipRoutes from "../components/ShipRoutes";
import ShipInspections from "../components/ShipInspections";

// Define a type for the valid status values

export default async function ShipDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const shipID = (await params).id;
  const ship = await getShipDetails(shipID);
  const {
    fuelRecords,
    routes,
    logbooks,
    crew,
    inspections,
    fixtures,
    certifications,
  } = ship;

  

  if (!ship || ship.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-semibold text-gray-700">
            Ship not found
          </h2>
          <p className="mt-2 text-gray-500">
            The requested ship information could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 flex flex-col w-full">
      <Header />
      <div className="flex flex-col animate-fade-in bg-blue-50 w-4/6 mx-auto">
        <ShipTitle ship={ship} />
      </div>

      <div className="flex flex-col mt-6 animate-fade-in bg-white w-4/6 mx-auto  p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
          <ShipDetailsSection ship={ship} />
          <ShipCrew crew={crew} />
          <ShipRoutes routes={routes} />
        </div>
      </div>
      <ShipInspections inspections={inspections}/>
     
      {/* Two Column Layout */}
      <div className="flex flex-row flex-wrap justify-between mt-8  w-4/6 mx-auto">
        {/* Certifications Section */}
        <div className="w-full lg:w-[48%] bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
          </div>

          {certifications && certifications.length > 0 ? (
            <div className="space-y-3">
              {certifications.map((certificate) => (
                <UniversalRouterButton
                  pathRoute="certifications"
                  pathSlug={certificate.id}
                  key={certificate.id}
                >
                  <div className="p-3 hover:bg-[#57C4FF] hover:text-white rounded-md transition-colors duration-300">
                    <div className="flex justify-between">
                      <p className="font-medium text-xs">{certificate.type}</p>
                      <p className="text-xs text-gray-500 group-hover:text-white">
                        {certificate.standard}
                      </p>
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                      <p className="text-gray-500 group-hover:text-white">
                        {certificate.issuingAuthority}
                      </p>
                      <p className="text-gray-500 group-hover:text-white">
                        <span
                          className={`${
                            new Date(certificate.expiryDate) < new Date()
                              ? "text-red-600 group-hover:text-red-200"
                              : "text-green-600 group-hover:text-green-200"
                          }`}
                        >
                          Expires:{" "}
                          {new Date(
                            certificate.expiryDate
                          ).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </UniversalRouterButton>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p className="text-xs">No certifications available.</p>
            </div>
          )}
        </div>

        {/* Fuel Records Section */}
        <div className="w-full lg:w-[48%] bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Fuel Records</h2>
          </div>

          {fuelRecords && fuelRecords.length > 0 ? (
            <div className="space-y-3">
              {fuelRecords.map((record) => (
                <div
                  key={record.id}
                  className="border-l-4 border-[#57C4FF] pl-3 py-2 hover:bg-[#57c4ff1a] transition-colors duration-300"
                >
                  <div className="flex justify-between">
                    <p className="font-medium text-xs">{record.fuelType}</p>
                    <p className="text-xs font-bold">{record.amount} tons</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-700">
                      {record.totalCost.toLocaleString()} USD
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p className="text-xs">No fuel records available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Logbooks Section */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6  w-4/6 mx-auto">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Logbook Entries
          </h2>
        </div>

        {logbooks && logbooks.length > 0 ? (
          <div className="space-y-3">
            {logbooks.map((entry) => (
              <div
                key={entry.id}
                className="border p-4 rounded-md hover:bg-[#57C4FF] hover:text-white transition-colors duration-300"
              >
                <div className="flex justify-between">
                  <p className="font-medium text-xs">{entry.operationType}</p>
                  <p className="text-xs text-gray-500 group-hover:text-white">
                    {new Date(entry.date).toLocaleDateString()}{" "}
                    {new Date(entry.date).toLocaleTimeString()}
                  </p>
                </div>
                <p className="text-xs mt-2">{entry.eventDescription}</p>
                <div className="flex flex-wrap gap-x-4 mt-2 text-xs text-gray-500 group-hover:text-white">
                  <span>Location: {entry.location}</span>
                  {entry.weatherConditions && (
                    <span>Weather: {entry.weatherConditions}</span>
                  )}
                  {entry.seaConditions && (
                    <span>Sea: {entry.seaConditions}</span>
                  )}
                  {entry.speed && <span>Speed: {entry.speed} knots</span>}
                </div>
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span>Signed by: {entry.responsible}</span>
                  {entry.inspectionCheck && (
                    <span className="text-green-600 group-hover:text-green-200">
                      Inspection completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p className="text-xs">No logbook entries available.</p>
          </div>
        )}
      </div>

      {/* Fixtures Section */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6  w-4/6 mx-auto">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Fixtures & Charters
          </h2>
        </div>

        {fixtures && fixtures.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white">
              <thead className="bg-white text-black text-xs border-b-4 border-[#57c4ff5b]">
                <tr>
                  <th className="p-3 text-left">Charterer</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Period</th>
                  <th className="p-3 text-left">Cost</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {fixtures.map((fixture, index) => (
                  <tr
                    key={fixture.id}
                    className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                      index === fixtures.length - 1 ? "rounded-b-lg" : ""
                    }`}
                  >
                    <td className="p-3 text-xs whitespace-nowrap">
                      {fixture.chartererName}
                    </td>
                    <td className="p-3 text-xs whitespace-nowrap">
                      {fixture.fixtureType}
                    </td>
                    <td className="p-3 text-xs whitespace-nowrap">
                      {new Date(fixture.startDate).toLocaleDateString()} -{" "}
                      {new Date(fixture.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-xs whitespace-nowrap">
                      {fixture.totalCost.toLocaleString()}{" "}
                      {fixture.currency || "USD"}
                    </td>
                    <td className="p-3 text-xs whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          fixture.status === "completed" || fixture.isCompleted
                            ? "bg-green-100 text-green-800"
                            : fixture.status === "in progress"
                            ? "bg-blue-100 text-blue-800"
                            : fixture.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {fixture.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p className="text-xs">No fixtures available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
