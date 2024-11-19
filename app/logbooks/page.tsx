import Header from "../components/header";
import LogbookList from "../components/logbooks/list";
import SideNavigation from "../components/sidenavigation";

export default async function Logbooks() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
        <SideNavigation />
        <div className="flex flex-col mt-0 w-auto h-auto">
          <h1 className="mx-6 text-3xl font-bold italic opacity-85">
           Inspections
          </h1>
          <LogbookList />
        </div>
      </div>
    </div>
  );
}
