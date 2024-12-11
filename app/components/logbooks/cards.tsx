import { getAllLogbooks, getLastLogbooksForShips } from "@/actions/logbook";
import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";

export default async function LogBoookCards() {
  const userShips = (await getAllUserShips()) || [];

  const logbooks = (await getAllLogbooks()) || [];

  return (
    <section className=" flex flex-col w-auto justify-start ml-20">
      <h1 className="text-3xl mb-4 italic border-l-4 border-blue-400 pl-2 ">
        Logbooks
      </h1>
      <div className="flex flex-row w-auto h-auto gap-4 flex-wrap">
        {userShips.map((ship) => {
          const shipLogbooks = logbooks
            .filter((logbook) => logbook.shipId === ship.id)
            .sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                return 0;
              }
              return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 10);

          return (
            <div
              key={ship.id}
              className="flex p-6 flex-col h-auto w-auto bg-white hover:bg-blue-50"
            >
              <h1 className="italic text-3xl hover:underline">
                <Link href={`/status/${ship.id}`}>{ship.name}</Link>
              </h1>
              <div className="flex flex-row flex-wrap gap-4 mt-2 items-end">
                <h2 className="font-semi text-sm">{ship.type}</h2>
                <h2 className="font-thin text-sm">IMO: {ship.imoNumber}</h2>
                {shipLogbooks.length > 0 && (
                  <h2 className="font-thin text-sm">
                    <span className="font-bold">{shipLogbooks.length}</span>{" "}
                    logbook
                    {shipLogbooks.length > 1 ? "s" : ""}
                  </h2>
                )}
                {shipLogbooks.length > 0 && (
                  <h2 className="font-thin text-sm bg-blue-400 rounded-md px-2 text-white hover:bg-blue-600">
                    <Link href={`/logbooks/ship/${ship.id}`}>All Logbooks</Link>
                  </h2>
                )}
              </div>
              <div className="flex flex-row items-start">
                {shipLogbooks.length === 0 ? (
                  <p className="italic text-gray-500 mt-4">
                    No Logbooks available for this ship.
                  </p>
                ) : (
                  <h3 className="font-bold mt-4"> Last logbooks:</h3>
                )}
                <div className="flex flex-col ml-2 mt-4 flex-wrap border-l-4 border-blue-400">
                  {shipLogbooks.map((logbook) => (
                    <Link
                      key={logbook.id}
                      href={`/logbooks/logbook/${logbook.id}`}
                    >
                      <div className="flex flex-row w-auto ml-2 text-sm justify-center hover:underline gap-2">
                        <p className="w-20 text-center">
                          {new Date(logbook.date).toLocaleDateString("en-US")}
                        </p>
                        <p className="w-20 text-left">{logbook.responsible}</p>

                        <p className="w-24  text-left">
                          {logbook.operationType}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
