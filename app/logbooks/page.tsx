import Header from "../components/header";
import LogbookList from "../components/logbooks/list";
import SideNavigation from "../components/sidenavigation";

export default async function Logbooks() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row animate-fade-in">
        <SideNavigation />
        <div className="flex flex-col mt-0 w-auto h-auto animate-fade-in">
         
          <LogbookList />
        </div>
      </div>
    </div>
  );
}
