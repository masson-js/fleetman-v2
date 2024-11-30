
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import InspectionList from "../components/inspections/list";

export default async function Inspections() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
        <SideNavigation />
        <div className="flex flex-col mt-0 w-auto h-auto">
          <h1 className="mx-6 text-3xl font-bold italic opacity-85">
           Inspections
          </h1>
          <InspectionList />
        </div>
      </div>
    </div>
  );
}
