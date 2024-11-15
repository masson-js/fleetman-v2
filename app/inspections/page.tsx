import { AddInspection } from "../components/buttons";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

export default async function Inspections() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
        <SideNavigation />
        <div className="flex m-6 w-auto h-auto ">Inspections</div>
        <AddInspection/>
      </div>
    </div>
  );
}
