"use client";

interface Fixture {
  id: string;
  shipId: string;
  chartererName: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  currency: string | null;
  paymentTerms: string;
  cargoDescription: string | null;
  deliveryLocation: string | null;
  fixtureType: string;
  brokerName: string | null;
  status: string;
  cancellationTerms: string | null;
  isCompleted: boolean;
  notes: string | null;
}

interface FixturesProps {
  fixtures: Fixture[];
}

export default function FixturesStatus({ fixtures }: FixturesProps) {
  const totalFixtures = fixtures.length;
  const completedCount = fixtures.filter(
    (fixture) => fixture.isCompleted
  ).length;
  const inProgressCount = fixtures.filter(
    (fixture) => !fixture.isCompleted
  ).length;
  const uniqueShips = new Set(fixtures.map((fixture) => fixture.shipId)).size;

  return (
    <div className="p-6 ">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl hover:bg-[#57C4FF] text-black hover:text-white hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4">Fixtures</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-xs">
            <span className="text-blue-600">Total Fixtures</span>
            <span className="font-semibold text-blue-800">{totalFixtures}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-green-100 rounded-md text-xs">
            <span className="text-green-600">Completed</span>
            <span className="font-semibold text-green-800">
              {completedCount}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-yellow-100 rounded-md text-xs gap-4">
            <span className="text-yellow-600">In Progress</span>
            <span className="font-semibold text-yellow-800">
              {inProgressCount}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-xs gap-4">
            <span className="text-gray-600">Ships Involved</span>
            <span className="font-semibold text-gray-800">{uniqueShips}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
