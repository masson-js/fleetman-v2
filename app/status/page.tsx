import { getAllUserShips, getSession } from "@/actions";
import { AddShipButton, ShipButton } from "../components/buttons";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import {
  durationCalc,
  getInspectionIcon,
  getStatusColorClass,
} from "../helpers";

export default async function Status() {
  const session = await getSession();

  if (!session || !session.isLoggedIn) {
    return <div>Извините, вам нужно войти в систему, чтобы увидеть данные</div>;
  }
  const shipsData = await getAllUserShips();

  function RoutesCalc() {
    const routes: Array<any> = []
  
    return routes.length === 0 ? 0 : routes.length;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex m-6">
        <SideNavigation />

        <section className="flex-1 m-6 max-w-max overflow-auto">
          <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
            <thead>
              <tr className="items-center">
                <th className="px-4 py-2 bg-gray-300 text-center rounded-tl-lg">
                  Name
                </th>
                <th className="px-4 py-2 bg-gray-300 text-center">Type</th>
                <th className="px-4 py-2 bg-gray-300 text-center">IMO</th>
                <th className="px-4 py-2 bg-gray-300 text-center">MMSI</th>
                <th className="px-4 py-2 bg-gray-300 text-center">year</th>
                <th className="px-4 py-2 bg-gray-300 text-center">routes</th>
                <th className="px-4 py-2 bg-gray-300 text-center">reg-port</th>
                <th className="px-4 py-2 bg-gray-300 text-center">eco</th>
                <th className="px-4 py-2 bg-gray-300 text-center">
                  duration in ml
                </th>
                <th className="px-4 py-2 bg-gray-300 text-center">status</th>
                <th className="px-4 py-2 bg-gray-300 text-center rounded-tr-lg">
                  ins. passed
                </th>
              </tr>
            </thead>
            <tbody>
              {shipsData.map((ship: any) => (
                <tr
                  className="text-center hover:bg-slate-600 hover:text-white"
                  key={ship.id}
                >
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.name}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.type}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.imoNumber}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.mmsi}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.yearBuilt}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>{RoutesCalc()}</ShipButton>
                  </td>

                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.portOfRegistry}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.ecoStandard}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      {durationCalc(ship.routes)}
                    </ShipButton>
                  </td>
                  <td
                    className={`px-6 py-2 ${getStatusColorClass(
                      ship.currentStatus
                    )}`}
                  >
                    <ShipButton imoNumber={ship.imoNumber}>
                      {ship.currentStatus}
                    </ShipButton>
                  </td>
                  <td className="px-4 py-2">
                    <ShipButton imoNumber={ship.imoNumber}>
                      <img
                        src={getInspectionIcon(ship.inspections)}
                        alt="Inspection Status"
                        className="w-6 h-6"
                      />
                    </ShipButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex m-6 border-t border-black pt-6 justify-center items-center">
            <AddShipButton />
          </div>
        </section>
      </div>
    </div>
  );
}
