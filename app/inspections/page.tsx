import { getAllInspections, getAllUserShips } from "@/actions";
import {  AddInspectionButton } from "../components/buttons";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import InspectionList from "../components/inspections/list";

export default async function Inspections() {

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
        <SideNavigation />
        <div className="flex flex-row mt-0 w-auto h-auto">
          <InspectionList/>
          <AddInspectionButton />
        </div>
      </div>
    </div>
  );
}

