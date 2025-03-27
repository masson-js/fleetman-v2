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

  // Find the most recent fixture by endDate
  const lastFixture = fixtures.length > 0 
    ? fixtures.reduce((latest, current) => 
        (new Date(latest.endDate) > new Date(current.endDate) ? latest : current)
      ) 
    : null;

  // Consistent date formatting to avoid hydration issues
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg h-80 p-6 w-full max-w-4xl border-2 border-solid border-white hover:border-[#57C4FF] hover:border-2 hover:border-solid text-black hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4 border-b-2 border-[#e81416]" >Fixtures</h2>
        <div className="space-y-3 ">
         

          <div className="flex items-center justify-between p-2 text-xs border-l-4 border-green-400 ">
            <span className="">Completed</span>
            <span className="font-semibold">
              {completedCount}
            </span>
          </div>

          <div className="flex items-center justify-between p-2  text-xs gap-4 border-l-4 border-yellow-400 ">
            <span className="">In Progress</span>
            <span className="font-semibold ">
              {inProgressCount}
            </span>
          </div>

          <div className="flex items-center justify-between p-2  text-xs gap-4">
            <span className="">Ships Involved</span>
            <span className="font-semibold ">{uniqueShips}</span>
          </div>

          <div className="flex items-center justify-between p-2 text-xs gap-4">
            <span className="">Last Date</span>
            <span className="font-semibold ">
              {lastFixture ? formatDate(lastFixture.endDate) : 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2  text-xs gap-4">
            <span className="">Last Location</span>
            <span className="font-semibold ">
              {lastFixture?.deliveryLocation || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}