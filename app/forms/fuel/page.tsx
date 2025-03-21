import { getAllUserShips } from "@/actions/ship";
import AddInspectionForm from "@/app/components/forms/inspectionadd";

import Header from "@/app/components/Header";


export default async function FuelCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex m-6">
      
        <AddInspectionForm shipsNames={shipsNames} />
       
      </div>
    </div>
  );
}
