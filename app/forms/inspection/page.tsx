
import { getAllUserShips } from "@/actions";
import InspectionAddForm from "@/app/components/forms/inspectionadd";
import TestForm from "@/app/components/forms/testinsp";

import Header from "@/app/components/header";
import SideNavigation from "@/app/components/sidenavigation";

export default async function ShipDataCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);


  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex m-6">
        <SideNavigation />

        {/* <InspectionAddForm shipsNames={shipsNames} /> */}
        <TestForm shipsNames={shipsNames} />
      </div>
     
    </div>
  );
}
