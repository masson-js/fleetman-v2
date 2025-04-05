import { getShipDetails } from "@/actions/ship";
import Header from "@/app/components/Header";
import { LoadingPlaceholder } from "@/app/components/PageLoading";
import { Suspense } from "react";
import ShipDetailsTop from "../../ship/components/ShipDetails";
import ShipInspections from "../../ship/components/ShipInspections";

async function CurrentShipInspections({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ship = await getShipDetails(id);
  return (
    <div className="bg-blue-50 flex flex-col w-full pb-12">
      {" "}
      <Header />
      <ShipDetailsTop ship={ship} />
      <ShipInspections inspections={ship.inspections} />
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
      <CurrentShipInspections params={params} />
    </Suspense>
  );
}
