import { getSession } from "@/actions/session";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import InspectionList from "../components/inspections/list";
import InspectionData from "../components/inspections/data";
import ShipCard from "../components/inspections/card";

export default async function Inspections() {
  const session = await getSession();

  if (!session || !session.isLoggedIn) {
    return <div>Sorry you have to log in</div>;
  }

  return (
    <div className="flex flex-col h-screen animate-fade-in">
      <Header />
      <div className="flex m-6 justify-between animate-fade-in">
        <SideNavigation />
        <div className="flex flex-col mt-0 w-auto h-auto animate-fade-in">
          
          {/* <InspectionList /> */}
          <ShipCard/>
        </div>
        <InspectionData />
      </div>
    </div>
  );
}
