import Header from "../components/header";
import LogBoookCards from "./components/cards";

import LogBookData from "./components/data";
import SideNavigation from "../components/sidenavigation";

export default async function Logbooks() {
  return (
    <div className="flex flex-col h-screen animate-fade-in mb-40">
      <Header />
      <div className="flex m-6 justify-between animate-fade-in">
        {/* <SideNavigation /> */}
        <div className="flex flex-col mt-0 w-auto h-auto animate-fade-in items-center">
          <LogBoookCards />
        </div>
        <LogBookData/>
      </div>
    </div>
  );
}


