import { getAllUserShips } from "@/actions";
import InspectionAddForm from "@/app/components/forms/inspectionadd";

import Header from "@/app/components/header";
import SideNavigation from "@/app/components/sidenavigation";

export default async function ShipDataCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex w-full m-6">
        <SideNavigation />
        <div className="flex flex-col ml-10 h-auto justify-center">
          <InspectionAddForm shipsNames={shipsNames} />
        </div>
      </div>
    </div>
  );
}
