import { getAllUserShips } from "@/actions";
import AddLogbookForm from "@/app/components/forms/addlogbook";
import AddInspectionForm from "@/app/components/forms/inspectionadd";

import Header from "@/app/components/header";
import SideNavigation from "@/app/components/sidenavigation";

export default async function LogbookCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex m-6">
        <SideNavigation />
        <AddLogbookForm shipsNames={shipsNames} />
      </div>
    </div>
  );
}
