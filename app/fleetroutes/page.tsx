import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

export default async function FleetRoutes() {
  return (
    <div className="flex flex-col animate-fade-in ">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row animate-fade-in">
        <SideNavigation />
        <div className="flex m-6 w-auto h-auto ">Fleet on map</div>
      </div>
    </div>
  );
}
