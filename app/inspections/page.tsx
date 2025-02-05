import { getSession } from "@/actions/session";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import InspectionData from "./components/data";
import InspectionsDataViz from "../components/dataviz/inspections/inspections-dataviz";
import ShipCardInspection from "./components/card";

export default async function Inspections() {
  const session = await getSession();

  if (!session || !session.isLoggedIn) {
    return <div>Sorry you have to log in</div>;
  }

  return (
    <div className="flex flex-col h-screen animate-fade-in mb-40">
      <Header />
      <div className="flex m-6 justify-center animate-fade-in gap-4">
   
        <div className="flex flex-row mt-0 ml-20 w-auto h-auto animate-fade-in gap-4">
          <ShipCardInspection />
        </div>
        <InspectionData />
      </div>
    </div>
  );
}
