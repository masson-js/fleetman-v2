import { getAllInspections } from "@/actions/inspection";
import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";

export default async function ShipCard() {
  const inspections = await getAllInspections();
  const userShips = await getAllUserShips();

  return (
    <div className="flex flex-col w-auto h-auto gap-4 flex-wrap">
      {userShips.map((ship) => (
        <div
          key={ship.id}
          className="flex p-6 flex-col h-auto w-auto bg-gray-200 hover:bg-blue-100 "
        >
          <h1 className="italic text-3xl">{ship.name}</h1>
          <div className="flex flex-row flex-wrap gap-4 mt-2">
            <h2 className="font-thin text-sm">Type: {ship.type}</h2>
            <h2 className="font-thin text-sm">IMO: {ship.imoNumber}</h2>
          </div>
          <div className="flex flex-row items-start">
            {inspections.length === 0 ? (
              <h3 className="font-bold mt-4">
                "you dont have inspections yet"
              </h3>
            ) : (
              <h3 className="font-bold mt-4">Inspections:</h3>
            )}
            <div className="flex flex-col ml-2 mt-4 flex-wrap border-l-4 border-blue-400">
              {inspections
                .filter((inspection) => inspection.shipId === ship.id)
                .map((inspection) => (
                 
                      <Link href={`/inspections/${inspection.id}`}>
                        <div
                          
                          className=" flex flex-row w-auto ml-2 text-sm justify-center  hover:underline" key={inspection.id}
                        >
                          <p className="w-20 text-center">
                           
                            {new Date(
                              inspection.inspectionDate
                            ).toLocaleDateString("en-US")}
                          </p>

                          <p className=" w-20 text-center">
                            {inspection.inspectionType}
                          </p>

                          <p className="w-24 text-center">
                            {inspection.verificationStatus}
                          </p>
                        
                          <p className="w-40 font-semibold ml-4 ">
                            Inspector: {inspection.inspectorName}
                          </p>
                        </div>
                      </Link>
                 
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    // <div className="flex flex-col m-6 w-auto h-auto gap-4 ">
    //   {ships.map((ship) => (
    //     <div
    //       key={ship.id}
    //       className="flex p-6 flex-col h-auto w-auto bg-gray-200 hover:bg-slate-300"
    //     >
    //       <div className="flex flex-col">
    //         <h2 className="text-3xl mb-4">{ship.name}</h2>
    //         <div className="flex flex-row items-center gap-4">
    //           <h2 className="font-thin text-sm">{ship.type}</h2>
    //           <h2 className="font-thin text-sm">IMO: {ship.imoNumber}</h2>
    //         </div>
    //       </div>
    //       <div className="flex w-auto mt-4">
    //         {inspections.length > 0 ? (
    //           <div>
    //             {inspections.map((inspection) => (
    //               <div>
    //                 <Link href={`/inspections/${inspection.id}`}>
    //                   <div
    //                     key={inspection.id}
    //                     className=" flex flex-row w-auto mt-2 text-sm gap-6 justify-start"
    //                   >
    //                     <p className="flex w-32">
    //                       Date:{" "}
    //                       {new Date(
    //                         inspection.inspectionDate
    //                       ).toLocaleDateString("en-US")}
    //                     </p>

    //                     <p className="text-blue-600 hover:underline  w-24">
    //                       {inspection.inspectionType}
    //                     </p>

    //                     <p className="flex  w-32">
    //                       {inspection.verificationStatus}
    //                     </p>
    //                     <p className="flex  w-32">
    //                       {inspection.id}
    //                     </p>
    //                     <p className="flex w-40">
    //                       Inspector: {inspection.inspectorName}
    //                     </p>
    //                   </div>
    //                 </Link>
    //               </div>
    //             ))}
    //           </div>
    //         ) : (
    //           <p>No inspections available.</p>
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
