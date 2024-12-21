import { getAllFixtures } from "@/actions/fixture";
import { FixtureEnhancedButton } from "@/app/components/buttons";

export default async function FixtureList() {
  const fixtures = await getAllFixtures();

  return (
    <div className="m-6 flex w-auto h-auto items-start">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
        <thead>
          <tr className="items-center">
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tl-lg w-36">
              Ship
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Charterer
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Start Date
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              End Date
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Total Cost
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Currency
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Status
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tr-lg w-28">
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {fixtures.map((fixture) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={fixture.id}
            >
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {fixture.ship.name}
                </FixtureEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {fixture.chartererName}
                </FixtureEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {new Date(fixture.startDate).toLocaleDateString("en-US")}
                </FixtureEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {new Date(fixture.endDate).toLocaleDateString("en-US")}
                </FixtureEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {fixture.totalCost.toFixed(2)}
                </FixtureEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {fixture.currency || "N/A"}
                </FixtureEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {fixture.status}
                </FixtureEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <FixtureEnhancedButton fixtureId={fixture.id}>
                  {fixture.isCompleted ? "YES" : "NO"}
                </FixtureEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
