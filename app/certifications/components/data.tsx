import { getInspectionStats } from "@/actions/counts";

interface InspectionStats {
  status: {
    passed: number;
    failed: number;
    requiresWork: number;
  };
  standards: Record<string, number>;
}

export default async function CertificationData() {
  const { status, standards } = await getInspectionStats();

  const totalCertifications = status.passed + status.failed + status.requiresWork;

  const passedPercentage = Math.round((status.passed / totalCertifications) * 100);
  const failedPercentage = Math.round((status.failed / totalCertifications) * 100);
  const requiresWorkPercentage = Math.round((status.requiresWork / totalCertifications) * 100);

  return (
    <div className="flex flex-col w-80 h-auto gap-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Certifications Overview */}
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold text-gray-800">Certification Overview</h2>
        <p className="text-sm text-gray-600">Total Certifications: {totalCertifications}</p>
      </div>

      {/* Verification Status Section */}
      <div className="border-b pb-4">
        <h2 className="text-sm font-semibold mb-3">Status Distribution</h2>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm text-gray-600">Passed</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white bg-green-500 px-2 py-1 rounded-lg">
                  {status.passed}
                </span>
                <span className="text-sm text-gray-500 w-12">
                  {passedPercentage}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-300 h-2 rounded-full" 
                style={{ width: `${passedPercentage}%` }}
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm text-gray-600">Failed</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white bg-red-500 px-2 py-1 rounded-lg">
                  {status.failed}
                </span>
                <span className="text-sm text-gray-500 w-12">
                  {failedPercentage}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-300 h-2 rounded-full" 
                style={{ width: `${failedPercentage}%` }}
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm text-gray-600">Requires Work</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white bg-yellow-500 px-2 py-1 rounded-lg">
                  {status.requiresWork}
                </span>
                <span className="text-sm text-gray-500 w-12">
                  {requiresWorkPercentage}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-300 h-2 rounded-full" 
                style={{ width: `${requiresWorkPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Standards Section */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Compliance Standards</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(standards).map(([standard, count]) => (
            <div
              key={standard}
              className="bg-blue-50 p-3 rounded-lg text-center"
            >
              <span className="text-lg font-bold text-blue-600">{count}</span>
              <span className="block text-xs text-gray-600 mt-1 break-words">
                {standard}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
