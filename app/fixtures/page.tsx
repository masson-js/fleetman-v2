import FixtureList from "@/app/fixtures/components/list";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";
import TestFixtureList from "../components/testlist";
import ShipCardFixture from "./components/card";

export default async function Fixtures() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
        <div className="flex flex-col mt-0 ml-20 w-auto h-auto">
         
          {/* <FixtureList/> */}
          <ShipCardFixture/>
        </div>
      </div>
    </div>
  );
}
