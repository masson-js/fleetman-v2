import { getAllUserShips } from "@/actions/ship";
import AddLogbookForm from "@/app/components/forms/addlogbook";


import Header from "@/app/components/Header";


export default async function LogbookCreating() {
  const shipsData = await getAllUserShips();
  const shipsNames = shipsData.map((ship) => ship.name);

  return (
    <div className="flex flex-col w-full h-auto">
      <Header />
      <div className="flex m-6 justify-center">
   
        <AddLogbookForm shipsNames={shipsNames} />
   
      </div>
    </div>
  );
}
