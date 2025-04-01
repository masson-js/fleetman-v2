import { getAllUserShips } from "@/actions/ship";
import { Suspense } from "react";
import AddInspectionForm from "@/app/components/forms/inspectionadd";
import { LoadingPlaceholder } from "@/app/components/PageLoading";

import Header from "@/app/components/Header";
import NewAddRouteForm from "../templates/Route";

async function RouteCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="bg-blue-50 flex flex-col w-full">
      <Header />
      <div className="flex flex-row flex-wrap w-4/6 mx-auto h-auto justify-center mt-4 mb-12 ">
        <NewAddRouteForm shipsNames={shipsNames} />
      </div>
    </div>
  );
}

export default async function ShipLogbookCreating() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <RouteCreating />
    </Suspense>
  );
}
