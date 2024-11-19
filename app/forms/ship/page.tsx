import { getSession } from "@/actions";
import ShipAddForm from "../../components/forms/shipaddform";
import Header from "@/app/components/header";
import SideNavigation from "@/app/components/sidenavigation";

export default async function ShipDataCreating() {
  const session = await getSession();
  const userName = session.username;

  return (
    <div className="flex flex-col mb-24 w-full h-auto">
      <Header />
      <div className="flex m-6">
        <SideNavigation />
        <ShipAddForm />
      </div>
    </div>
  );
}
