import CrewData from "../components/crews/data";
import ExtendedData from "../components/crews/extended";
import CrewList from "../components/crews/list";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

export default async function Crews() {
  return (
    <div className="flex flex-col animate-fade-in">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row justify-between animate-fade-in">
        <SideNavigation />
        <div className="flex flex-col h-auto animate-fade-in">
          <h1 className="mx-6 text-3xl font-bold italic opacity-85 ">Crews</h1>
          <CrewList />
          <ExtendedData />
        </div>
        <CrewData />
      </div>
    </div>
  );
}
