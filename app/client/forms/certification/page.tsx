import { Suspense } from "react";
import Header from "@/app/components/Header";
import { getAllUserShips } from "@/actions/ship";
import NewAddCertifcationForm from "../templates/Certificate";
import { LoadingPlaceholder } from "@/app/components/PageLoading";

async function CertificationCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="bg-blue-50 flex flex-col w-full">
      <Header />
      <div className="flex flex-row flex-wrap  w-4/6 mx-auto h-auto justify-center mt-4 mb-12 ">
        <NewAddCertifcationForm shipsNames={shipsNames} />
      </div>
    </div>
  );
}

export default async function ShipCertificateCreating() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <CertificationCreating />
    </Suspense>
  );
}
