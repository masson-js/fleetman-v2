import { getSession } from "@/actions/session";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import InspectionList from "../components/inspections/list";
import InspectionData from "../components/inspections/data";

export default async function Inspections() {
  const session = await getSession();

  if (!session || !session.isLoggedIn) {
    return <div>Sorry you have to log in</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex m-6 justify-between">
        <SideNavigation />
        <div className="flex flex-col mt-0 w-auto h-auto">
          <h1 className="mx-6 text-3xl font-bold italic opacity-85">
            Inspections
          </h1>
          <InspectionList />
        </div>
        <InspectionData />
      </div>
    </div>
  );
}
