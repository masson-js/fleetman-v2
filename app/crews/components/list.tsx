import { getAllCrewMembers } from "@/actions/crew";
import { UniversalRouterButton } from "../../components/buttons";
import { getAllUserShips } from "@/actions/ship";

export default async function CrewList() {
  const crews = await getAllCrewMembers();
  const userShips = await getAllUserShips();

  return (
    <section className=" flex flex-col w-auto justify-start">
        <h1 className="text-3xl mb-4 italic border-l-4 border-blue-400 pl-2 ">
          Crews
        </h1>
      <div className="flex flex-col m-6 w-auto h-auto gap-4 flex-wrap">
        {userShips.map((ship) => (
          <div
            key={ship.id}
            className="flex flex-wrap p-6 flex-col h-auto w-auto bg-gray-200 hover:bg-slate-300 "
          >
            <h1 className="italic text-3xl">{ship.name}</h1>
            <div className="flex flex-row flex-wrap gap-4 mt-2">
              <h2 className="font-thin text-sm">Type: {ship.type}</h2>
              <h2 className="font-thin text-sm">IMO: {ship.imoNumber}</h2>
            </div>
            <div className="flex flex-row items-start">
              {crews.length === 0 ? (
                <h3 className="font-bold mt-4">
                  "you dont have crew members yet"
                </h3>
              ) : (
                <h3 className="font-bold mt-4">Crew Members:</h3>
              )}
              <div className="flex flex-col ml-2 mt-4 flex-wrap border-l-4 border-blue-400 ">
                {crews
                  .filter((crewMember) => crewMember.shipId === ship.id)
                  .map((crewMember) => (
                    <UniversalRouterButton
                      key={crewMember.id}
                      pathRoute="crews"
                      pathSlug={crewMember.id}
                    >
                      <div className="flex flex-col ml-2 my-2">
                        <div className="flex flex-row flex-wrap gap-4 justify-between hover:underline">
                          <h2>{crewMember.name}</h2>
                          <span>|</span>
                          <h2>{crewMember.role}</h2>
                          <span>|</span>
                          <h2>{crewMember.nationality}</h2>
                          <span>|</span>
                          <h2>{crewMember.status}</h2>
                        </div>
                      </div>
                    </UniversalRouterButton>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
