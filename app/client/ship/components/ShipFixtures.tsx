'use client';

interface Fixture {
  id: string;
  chartererName: string;
  fixtureType: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  currency: string | null;
  status: string;
  isCompleted: boolean;
}

interface FixturesProps {
  fixtures: Fixture[];
}

export default function Fixtures({ fixtures }: FixturesProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB').format(new Date(date)); // Format to DD/MM/YYYY
  };

  return (
    <div className="flex animate-fade-in flex-col bg-white w-4/6 mx-auto mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-[#e81416]">Fixtures & Charters</h2>
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
                    index === fixtures.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  <td className="p-3 text-xs whitespace-nowrap">
                    {fixture.chartererName}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {fixture.fixtureType}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {formatDate(fixture.startDate)} - {formatDate(fixture.endDate)}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {fixture.totalCost.toLocaleString()} {fixture.currency || 'USD'}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        fixture.status === 'completed' || fixture.isCompleted
                          ? 'bg-green-100 text-green-800'
                          : fixture.status === 'in progress'
                          ? 'bg-blue-100 text-blue-800'
                          : fixture.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
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
  );
}
