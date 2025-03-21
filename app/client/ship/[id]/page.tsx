import { getShipDetails } from "@/actions/ship";

import Header from "@/app/components/Header";
import ShipCrew from "../components/ShipCrew";
import ShipRoutes from "../components/ShipRoutes";
import ShipInspections from "../components/ShipInspections";
import ShipCertifications from "../components/ShipCertifications";
import ShipFuelRecords from "../components/ShipFuelRecords";
import ShipLogbooks from "../components/ShipLogbooks";
import ShipFixtures from "../components/ShipFixtures";
import ShipDetailsTop from "../components/ShipDetails";


export default async function ShipDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const shipID = (await params).id;
  const ship = await getShipDetails(shipID);
  const {
    fuelRecords,
    routes,
    logbooks,
    crew,
    inspections,
    fixtures,
    certifications,
  } = ship;

  if (!ship || ship.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-semibold text-gray-700">
            Ship not found
          </h2>
          <p className="mt-2 text-gray-500">
            The requested ship information could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 flex flex-col w-full pb-12">
      <Header />
      <ShipDetailsTop ship={ship}/>
      <ShipFixtures fixtures={fixtures} />
      <ShipInspections inspections={inspections} />
      <ShipCertifications certifications={certifications} />
      <ShipFuelRecords fuelRecords={fuelRecords} />
      <ShipRoutes routes={routes} />
      <ShipCrew crew={crew} />
      <ShipLogbooks logbooks={logbooks} />

    </div>
  );
}
