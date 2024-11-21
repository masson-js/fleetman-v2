import { getAllLogbooks } from "@/actions";  // Assuming you have a method to fetch logbooks
import { LogbookEnhancedButton } from "../buttons";  // Assuming you have a button component for logbooks

export default async function LogbookList() {
  const logbooks = await getAllLogbooks();

  return (
    <div className="m-6 flex w-auto h-auto items-start">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
        <thead>
          <tr className="items-center">
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tl-lg w-36">
              Ship
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Responsible
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Date
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Operation
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Weather
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Sea
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Speed
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Engine
            </th>
           
           
          </tr>
        </thead>
        <tbody>
          {logbooks.map((logbook) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={logbook.id}
            >
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {logbook.ship.name}
                </LogbookEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {logbook.responsible}
                </LogbookEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {new Date(logbook.date).toLocaleDateString("en-US")}
                </LogbookEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {logbook.operationType}
                </LogbookEnhancedButton>
              </td>
              
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {logbook.weatherConditions || "N/A"}
                </LogbookEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {logbook.seaConditions || "N/A"}
                </LogbookEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {logbook.speed ? `${logbook.speed} knots` : "N/A"}
                </LogbookEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <LogbookEnhancedButton logbookId={logbook.id}>
                  {logbook.engineStatus || "N/A"}
                </LogbookEnhancedButton>
              </td>
            
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
