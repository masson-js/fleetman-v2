import { getAllCrewMembers, getAllUserShips } from "@/actions";

export default async function CrewData() {
  const crews = await getAllCrewMembers();
  const userShips = await getAllUserShips();
  const crewMembersCount = crews.length;
  const ShipsCount = userShips.length;
  const activeMembers = crews.filter((member) => member.status === "active");
  const onLeavemembers = crews.filter((member) => member.status === "on-leave")
  return (
    <div className="flex flex-col mt-6 w-40 h-auto bg-gray-200">
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Ships:</h2>
        <h2 className="text-lg font-semibold">{ShipsCount}</h2>
      </div>
      <div className="flex flex-row items-center flex-wrap gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Members:</h2>
        <h2 className="text-lg font-semibold">{crewMembersCount}</h2>
      </div>
      <div className="flex flex-row gap-1 mt-6 ml-3 items-center">
        <h2 className="text-sm font-thin">Active:</h2>
        <h2 className="text-lg font-semibold">{activeMembers.length}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">On leave:</h2>
        <h2 className="text-lg font-semibold">{onLeavemembers.length}</h2>
      </div>
    </div>
  );
}
