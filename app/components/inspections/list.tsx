import { getAllInspections } from "@/actions";
import { InspectionEnhancedButton } from "../buttons";

export default async function InspectionList() {
  const inspections = await getAllInspections();

  return (
    <div className=" m-6 flex w-auto h-auto items-start">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
        <thead>
          <tr className="items-center">
            <th className="text-sm  px-4 py-1 bg-gray-300 text-center rounded-tl-lg w-36">
              Ship
            </th>
            <th className="text-sm  px-4 py-1 bg-gray-300 text-center w-36">
              Inspector
            </th>
            <th className="text-sm  px-4 py-1 bg-gray-300 text-center w-28">
              Date
            </th>
            <th className="text-sm  px-4 py-1 bg-gray-300 text-center w-28">
              Type
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Result
            </th>
            <th className="text-sm  px-4 py-1 bg-gray-300 text-center w-28">
              Standart
            </th>

            <th className="text-sm  px-4 py-1 bg-gray-300 text-center w-36">
              Status
            </th>

            <th className="text-sm  px-4 py-1 bg-gray-300 text-center rounded-tr-lg w-28">
              EU Comp.
            </th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((inspection) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={inspection.id}
            >
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.ship.name}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.inspectorName}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {new Date(inspection.inspectionDate).toLocaleDateString(
                    "en-US"
                  )}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.inspectionType}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.results}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.complianceStandards}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.verificationStatus}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.isEUCompliance ? "YES" : "NO"}
                </InspectionEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
