import { getAllUserShips } from "@/actions/ship";
import AddCertifcationForm from "@/app/components/forms/certification";

import Header from "@/app/components/Header";


export default async function CertificationCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex m-6 justify-center">
        <AddCertifcationForm shipsNames={shipsNames} />
      </div>
    </div>
  );
}
