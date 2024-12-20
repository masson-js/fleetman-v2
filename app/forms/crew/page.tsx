import { getAllUserShips } from "@/actions/ship";
import AddCrewForm from "@/app/components/forms/crew";
import AddInspectionForm from "@/app/components/forms/inspectionadd";

import Header from "@/app/components/header";
import SideNavigation from "@/app/components/sidenavigation";

export default async function FixtureCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex m-6">
        <SideNavigation />
        <AddCrewForm shipsNames={shipsNames} />
      </div>
    </div>
  );
}
