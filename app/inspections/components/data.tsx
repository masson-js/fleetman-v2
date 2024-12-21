import { getInspectionStats, getTotalArraysCount } from "@/actions/counts";

export default async function InspectionData() {
  const { status, standards } = await getInspectionStats();

  return (
    <div className="flex flex-col w-40 h-auto gap-2 ">
      <h2 className="text-sm font-semibold mt-2 ml-2">Verification Status:</h2>
      <div className="flex flex-row items-center gap-1 ml-2 justify-between mx-4">
        <h3 className="text-sm font-thin">Passed:</h3>
        <h3 className="text-sm font-semibold text-white bg-green-500 p-1 rounded-lg w-6 h-6 flex items-center justify-center">
          {status.passed}
        </h3>
      </div>
      <div className="flex flex-row items-center gap-1 ml-2 justify-between mx-4">
        <h3 className="text-sm font-thin">Failed:</h3>
        <h3 className="text-sm font-semibold text-white bg-red-500 p-1 rounded-lg w-6 h-6 flex items-center justify-center">
          {status.failed}
        </h3>
      </div>
      <div className="flex flex-row items-center gap-1 ml-2 justify-between mx-4 ">
        <h3 className="text-sm font-thin">Requires Work:</h3>
        <h3 className="text-sm font-semibold text-white bg-yellow-500 p-1 rounded-lg w-6 h-6 flex items-center justify-center">
          {" "}
          {status.requiresWork}
        </h3>
      </div>

      <div>
        <h2 className="text-sm font-semibold mt-2 ml-2">Standards:</h2>
        <div className="flex flex-col">
          {Object.entries(standards).map(([standard, count]) => (
            <div
              className="flex flex-row items-center gap-1 ml-2 justify-between mx-4"
              key={standard}
            >
              <h3 className="text-sm font-thin"> {standard}</h3>
              <h3 className="text-sm font-semibold p-1 flex items-center justify-center">
                {count}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
