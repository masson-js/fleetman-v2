import { getAllUserShips } from "@/actions";
import {
  InspectionEnhancedButton,
  StatusEnhancedButton,
} from "@/app/components/buttons";
import WaveIcon from "./waveicon";

export default async function TestLinst() {
  const userShips = await getAllUserShips();

  if (!userShips || userShips.length === 0) {
    return <WaveIcon />;
  }

  return (
    <section className="flex-1 m-6 max-w-max overflow-auto">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
        <thead>
          <tr className="items-center">
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tl-lg w-36">
              Ship
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Type
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              IMO
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              MMSI
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Built
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Port
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-56">
              ECO
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tr-lg w-28">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {userShips.map((ship) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={ship.id}
            >
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton inspectionId={ship.id}>
                  {ship.name}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={ship.id}>
                  {ship.type}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={ship.id}>
                  {ship.imoNumber}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={ship.id}>
                  {ship.mmsi}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={ship.id}>
                  {ship.yearBuilt}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={ship.id}>
                  {ship.portOfRegistry}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={ship.id}>
                  {ship.ecoStandard}
                </InspectionEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <InspectionEnhancedButton inspectionId={ship.id}>
                  {ship.currentStatus}
                </InspectionEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
