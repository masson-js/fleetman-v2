import { getSession } from "@/actions";
import ShipAddForm from "../../components/forms/shipaddform";

export default async function ShipDataCreating() {
  const session = await getSession()
  const userName = session.username
  
  return (
    <div className="flex w-full h-auto">
      <ShipAddForm userName={userName}/>
    </div>
  );
}
