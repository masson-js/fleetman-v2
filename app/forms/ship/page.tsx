import { getSession } from "@/actions/session";
import ShipAddForm from "../../components/forms/shipaddform";
import Header from "@/app/components/Header";


export default async function ShipDataCreating() {
  const session = await getSession();
  const userName = session.username;

  return (
    <div className="flex flex-col mb-24 w-full h-auto">
      <Header />
      <div className="flex m-6 justify-center">
    
        <ShipAddForm />
      
      </div>
    </div>
  );
}
