import { Suspense } from "react";
import { getAllUserShips } from "@/actions/ship";
import Header from "@/app/components/Header";
import NewAddFixtureForm from "../templates/Fixture";
import { LoadingPlaceholder } from "@/app/components/PageLoading";

async function FixtureCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="bg-blue-50 flex flex-col w-full">
      <Header />
      <div className="flex flex-row flex-wrap  w-4/6 mx-auto h-auto justify-center mt-4 mb-12 ">
        <NewAddFixtureForm shipsNames={shipsNames} />
      </div>
    </div>
  );
}

export default async function ShipFixtureCreating() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <FixtureCreating />
    </Suspense>
  );
}
