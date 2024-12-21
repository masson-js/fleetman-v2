import CrewData from "./components/data";
import ExtendedData from "./components/extended";
import CrewList from "./components/list";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

export default async function Crews() {
  return (
    <div className="flex flex-col animate-fade-in">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row justify-between animate-fade-in ">
      
        <div className="flex ml-20  h-auto animate-fade-in">
          <CrewList />
          <ExtendedData />
        </div>
        <CrewData />
      </div>
    </div>
  );
}
