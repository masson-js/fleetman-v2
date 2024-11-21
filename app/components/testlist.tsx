import { getAllCrewMembers, getAllUserShips } from "@/actions";
import { UniversalRouterButton } from "./buttons";

export default async function TestCrewList() {
  const crews = await getAllCrewMembers();
  const userShips = await getAllUserShips();

  return (
    <div className="flex m-6 w-auto h-auto gap-4 flex-wrap">
      {userShips.map((ship) => (
        <div
          key={ship.id}
          className="flex p-6 flex-col h-auto w-auto bg-gray-200 hover:bg-slate-300 "
        >
          <h1 className="italic text-3xl">{ship.name}</h1>
          <div className="flex flex-row flex-wrap gap-4 mt-2">
            <h2 className="font-thin text-sm">Type: {ship.type}</h2>
            <h2 className="font-thin text-sm">IMO: {ship.imoNumber}</h2>
          </div>
          <div className="flex flex-row items-center">
            <h3 className="font-bold mt-4">Crew Members:</h3>
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
                      <div className="flex flex-row flex-wrap gap-4 justify-between">
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
  );
}
