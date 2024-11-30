import { getSession } from "@/actions/session";

import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

import StatusList from "../components/status/list";

import StatusData from "../components/status/data";
import WaveIcon from "../components/waveicon";

export default async function Status() {
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
          <h1 className="mx-6 text-3xl font-bold italic opacity-85">Status</h1>
          <StatusList />
        </div>
        <StatusData />
      </div>
    </div>
  );
}
