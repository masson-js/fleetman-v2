import { getAllUserShips } from "@/actions/ship";
import { Suspense } from "react";
import Header from "@/app/components/Header";
import NewAddCrewForm from "../templates/CrewMember";
import { LoadingPlaceholder } from "@/app/components/PageLoading";

async function CrewCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="bg-blue-50 flex flex-col w-full">
      <Header />
      <div className="flex flex-row flex-wrap  w-4/6 mx-auto h-auto justify-center mt-4 mb-12 ">
        <NewAddCrewForm shipsNames={shipsNames} />
      </div>
    </div>
  );
}

export default async function ShipCrewCreating() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <CrewCreating />
    </Suspense>
  );
}
