import { getSession } from "@/actions/session";

import Header from "@/app/components/Header";
import ShipAddForm from "../templates/Ship";


export default async function ShipDataCreating() {
  const session = await getSession();
  const userName = session.username;

  return (
    <div className="bg-blue-50 flex flex-col w-full">
      <Header />
      <div className="flex flex-row flex-wrap  w-4/6 mx-auto h-auto justify-center mt-4 mb-12 ">
        <ShipAddForm />
      </div>
    </div>
  );
}
