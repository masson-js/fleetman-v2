import { getInspectionById } from "@/actions/inspection";
import { getShipDetails } from "@/actions/ship";

import Header from "@/app/components/Header";
import { LoadingPlaceholder } from "@/app/components/PageLoading";
import { Suspense } from "react";
import ShipBarDetails from "./components/ShipBarDetails";
import Inspection from "./components/Inspection";

async function CurrentInspection({ inspectionId }: { inspectionId: string }) {
  const inspection = await getInspectionById(inspectionId);
  const ship = await getShipDetails(inspection.shipId);

  if (!inspection) {
    return (
      <div className="flex content-center">
        <div>Cant find this inspection</div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 flex flex-col w-full pb-12">
      <Header />
      <ShipBarDetails ship={ship} />
      <Inspection inspection={inspection} />
    </div>
  );
}

export default async function InspectionPage({
  params,
}: {
  params: {
    inspectionId: string;
  };
}) {
  const { inspectionId } = await params;

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <CurrentInspection inspectionId={inspectionId} />
    </Suspense>
  );
}
