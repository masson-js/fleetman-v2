import { getShipDetails } from "@/actions/ship";
import { Suspense } from "react";
import Header from "@/app/components/Header";
import ShipCrew from "../components/ShipCrew";
import ShipRoutes from "../components/ShipRoutes";
import ShipInspections from "../components/Shipinspections";
import ShipCertifications from "../components/ShipCertifications";
import ShipFuelRecords from "../components/ShipFuelRecords";
import ShipLogbooks from "../components/ShipLogbooks";
import ShipFixtures from "../components/ShipFixtures";
import ShipDetailsTop from "../components/ShipDetails";
import { LoadingPlaceholder } from "@/app/components/PageLoading";

async function ShipDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ship = await getShipDetails(id);

  if (!ship) {
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
      <ShipDetailsTop ship={ship} />
      <ShipFixtures fixtures={ship.fixtures} />
      <ShipInspections inspections={ship.inspections} />
      <ShipCertifications certifications={ship.certifications} />
      <ShipFuelRecords fuelRecords={ship.fuelRecords} />
      <ShipRoutes routes={ship.routes} />
      <ShipCrew crew={ship.crew} />
      <ShipLogbooks logbooks={ship.logbooks} />
    </div>
  );
}

export default function ShipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <ShipDetails params={params} />
    </Suspense>
  );
}
