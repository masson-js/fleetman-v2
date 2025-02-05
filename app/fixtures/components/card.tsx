import { getAllFixtures } from "@/actions/fixture";
import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";

export default async function ShipCardFixture() {
  const fixtures = (await getAllFixtures()) || [];
  const userShips = (await getAllUserShips()) || [];

  return (
    <section className="flex flex-col w-auto justify-start">
      <h1 className="text-3xl mb-4 italic border-l-4 border-blue-400 pl-2">
        Fixtures
      </h1>
      <div className="flex flex-col w-auto h-auto gap-4 flex-wrap">
        {userShips.map((ship) => {
          const shipFixture = fixtures.filter(
            (fixture) => fixture.shipId === ship.id
          );
          return (
            <div
              key={ship.id}
              className="flex p-6 flex-col h-auto w-auto bg-white hover:bg-blue-100"
            >
              <Link href={`/status/${ship.id}`}>
                <h1 className="italic text-3xl">{ship.name}</h1>
              </Link>
              <div className="flex flex-row flex-wrap gap-4 mt-2">
                <h2 className="font-thin text-sm">Type: {ship.type}</h2>
                <h2 className="font-thin text-sm">IMO: {ship.imoNumber}</h2>
              </div>
              <div className="flex flex-col mt-4">
                {shipFixture.length === 0 ? (
                  <p className="text-gray-500">No fixtures available for this ship.</p>
                ) : (
                  <>
                    <h3 className="font-bold mb-2">Fixtures:</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs table-auto border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Start Date
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              End Date
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Charterer Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Total Cost
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Currency
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Fixture Type
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Status
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {shipFixture.map((fixture) => (
                            <tr
                              key={fixture.id}
                              className="odd:bg-white even:bg-gray-50"
                            >
                              <td className="border border-gray-300 px-4 py-2">
                                {new Date(
                                  fixture.startDate
                                ).toLocaleDateString("en-US")}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {new Date(fixture.endDate).toLocaleDateString(
                                  "en-US"
                                )}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {fixture.chartererName}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {fixture.totalCost.toFixed(2)}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {fixture.currency || "N/A"}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {fixture.fixtureType}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {fixture.status}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {fixture.notes || "No Notes"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
