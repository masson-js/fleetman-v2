import { getAllUserShips, getSession } from "@/actions";
import { AddShipButton } from "../components/buttons";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

import StatusList from "../components/status/list";

export default async function Status() {
  const session = await getSession();

  if (!session || !session.isLoggedIn) {
    return <div>Извините, вам нужно войти в систему, чтобы увидеть данные</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex m-6">
        <SideNavigation />
        <StatusList />
      </div>
    </div>
  );
}
