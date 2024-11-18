import { getAllInspections } from "@/actions";
import { InspectionEnhancedButton} from "../buttons";

export default async function InspectionList() {
  const inspections = await getAllInspections();

  return (
    <div className=" m-6 flex w-auto h-auto">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
        <thead>
          <tr className="items-center">
            <th className="text-xs px-4 py-2 bg-gray-300 text-center rounded-tl-lg">
              Ship
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Inspector
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">Date</th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">Type</th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Result
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Recomendation
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Next Inspect.
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Standart
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Deficiencies
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Action
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center ">
              Ver. Status
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center">
              Duration
            </th>
            <th className="text-xs px-4 py-2 bg-gray-300 text-center rounded-tr-lg">
              EU Compliance
            </th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((inspection) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={inspection.id}
            >
              <td className="px-4 py-2">
                <InspectionEnhancedButton inspectionId={inspection.id}>
                  {inspection.ship.name}
                </InspectionEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
