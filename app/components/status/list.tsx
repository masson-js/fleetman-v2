import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";

export default async function StatusList() {
  const data = await getAllUserShips();

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
          {data.map((ship) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={ship.id}
            >
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.name}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.type}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.imoNumber}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.mmsi}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.yearBuilt}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.portOfRegistry}</Link>
              </td>
              <td className="px-4 py-2 text-ls">
                <Link href={`/status/${ship.id}`}>{ship.ecoStandard}</Link>
              </td>
              <td className={`text-sm font-bold ${
                        ship.currentStatus === "in port"
                          ? "bg-green-500 text-white"
                          : ship.currentStatus === "on the way"
                          ? "bg-blue-500 text-white"
                          : ship.currentStatus === "waiting"
                          ? "bg-yellow-500 text-white"
                          : ship.currentStatus === "fix"
                          ? "bg-red-500 text-white"
                          : ship.currentStatus === "other"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}>
                <Link href={`/status/${ship.id}`}>{ship.currentStatus}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
