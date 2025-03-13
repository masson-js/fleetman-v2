'use client';

import { InspectionEnhancedButton } from "@/app/components/buttons";



interface Inspection {
  id: string;
  shipId: string;
  inspectionDate: Date;
  inspectorName: string;
  inspectionType: string;
  results: string;
  recommendations: string | null;
  nextInspectionDate: Date | null;
  inspectionReport: string | null;
  complianceStandards: string;
  deficienciesFound: string | null;
  correctiveActions: string | null;
  verificationStatus: string;
  duration: number | null;
  isEUCompliance: boolean;
}

interface ShipInspectionsProps {
  inspections: Inspection[];
}

export default function ShipInspections({ inspections }: ShipInspectionsProps) {
  return (
    <div className="flex animate-fade-in flex-col bg-white w-4/6 mx-auto mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800">Inspections & Compliance</h2>
      </div>

      {inspections && inspections.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="min-w-full table-auto bg-white ">
            <thead className="bg-white text-black text-xs border-b-4 border-[#57c4ff5b] ">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Inspector</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Standards</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">EU Compliant</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection, index) => (
                <tr
                  key={inspection.id}
                  className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                    index === inspections.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  <td className="p-3 text-xs whitespace-nowrap">
                    <InspectionEnhancedButton inspectionId={inspection.id}>
                      {new Date(inspection.inspectionDate).toLocaleDateString('en-US')}
                    </InspectionEnhancedButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <InspectionEnhancedButton inspectionId={inspection.id}>
                      {inspection.inspectorName}
                    </InspectionEnhancedButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <InspectionEnhancedButton inspectionId={inspection.id}>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          inspection.inspectionType === 'regular' ? 'bg-blue-100 text-blue-800' :
                          inspection.inspectionType === 'unscheduled' ? 'bg-orange-100 text-orange-800' :
                          inspection.inspectionType === 'follow-up' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inspection.inspectionType}
                      </span>
                    </InspectionEnhancedButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <InspectionEnhancedButton inspectionId={inspection.id}>
                      {inspection.complianceStandards}
                    </InspectionEnhancedButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <InspectionEnhancedButton inspectionId={inspection.id}>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          inspection.results === 'passed' ? 'bg-green-100 text-green-800' :
                          inspection.results === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          inspection.results === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inspection.results}
                      </span>
                    </InspectionEnhancedButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <InspectionEnhancedButton inspectionId={inspection.id}>
                      {inspection.isEUCompliance ? 'Yes' : 'No'}
                    </InspectionEnhancedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No inspection records available.</p>
        </div>
      )}
    </div>
  );
}