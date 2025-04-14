import { getShipDetails } from "@/actions/ship";
import Header from "@/app/components/Header";
import { LoadingPlaceholder } from "@/app/components/PageLoading";
import { Suspense } from "react";


import ShipInspectionsTable from "./components/ShipInspectionsTable";
import ShipBarDetailed from "./components/ShipBarDetailed";

async function CurrentShipInspections({
  params,
}: {
  params: Promise<{ shipId: string }>;
}) {
  const { shipId } = await params;
  const ship = await getShipDetails(shipId);
  return (
    <div className="bg-blue-50 flex flex-col w-full pb-12">
      {" "}
      <Header />
      <ShipBarDetailed ship={ship} />
      <ShipInspectionsTable inspections={ship.inspections}/>
    </div>
  );
}

export default function ShipPage({
  params,
}: {
  params: Promise<{ shipId: string }>;
}) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <CurrentShipInspections params={params} />
    </Suspense>
  );
}
