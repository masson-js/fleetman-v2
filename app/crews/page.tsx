import CrewList from "../components/crews/list";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import TestCrewList from "../components/testlist";

export default async function Crews() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
        <SideNavigation />
        <div className="flex flex-col mt-0 w-auto h-auto">
          <h1 className="mx-6 text-3xl font-bold italic opacity-85">Crews</h1>
          <CrewList />
        </div>
      </div>
    </div>
  );
}
