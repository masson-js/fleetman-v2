
import { getAllUserShips } from "@/actions";
import { InspectionEnhancedButton, StatusEnhancedButton } from "../buttons";

export default async function StatusList() {
  const userShips = await getAllUserShips();

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
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.name}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.type}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.imoNumber}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.mmsi}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.yearBuilt}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.portOfRegistry}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.ecoStandard}
                </StatusEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <StatusEnhancedButton shipId={ship.id}>
                  {ship.currentStatus}
                </StatusEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
