import { getAllInspections } from "@/actions/inspection";
import { InspectionEnhancedButton } from "../../components/buttons";
import Link from "next/link";

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
              className="text-center hover:bg-slate-600 hover:text-white "
              key={inspection.id}
            >
              <td className="px-4 py-2 text-ls">
                <Link href={`/inspections/${inspection.id}`}>
                  {inspection.ship.name}
                </Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/inspections/${inspection.id}`}>
                  {inspection.inspectorName}
                </Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/inspections/${inspection.id}`}>
                  {new Date(inspection.inspectionDate).toLocaleDateString(
                    "en-US"
                  )}
                </Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/inspections/${inspection.id}`}>
                  {inspection.inspectionType}
                </Link>
              </td>

              <td className="px-4 py-2 text-ls">
                <Link href={`/inspections/${inspection.id}`}>
                  {inspection.complianceStandards}
                </Link>
              </td>
              <td
                className={`text-sm font-bold ${
                  inspection.verificationStatus === "passed"
                    ? "bg-green-500 text-white"
                    : inspection.verificationStatus === "requires-work"
                    ? "bg-yellow-500 text-white"
                    : inspection.verificationStatus === "failed"
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <Link href={`/inspections/${inspection.id}`}>
                  {inspection.verificationStatus}
                </Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/inspections/${inspection.id}`}>
                  {inspection.isEUCompliance ? "YES" : "NO"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
