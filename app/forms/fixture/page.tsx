import { getAllUserShips } from "@/actions";
import AddFixtureForm from "@/app/components/forms/fixtures";

import Header from "@/app/components/header";
import SideNavigation from "@/app/components/sidenavigation";

export default async function FixtureCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex m-6 justify-between">
        <SideNavigation />
        <AddFixtureForm shipsNames={shipsNames} />
        <span className="w-40 h-auto">Data</span>
      </div>
    </div>
  );
}
