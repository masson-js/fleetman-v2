import { getAllCrewMembers, getAllUserShips } from "@/actions";

export default async function ExtendedData() {

  const crews = await getAllCrewMembers();
  const userShips = await getAllUserShips();

  return (
    <div className="flex flex-col m-6 w-auto h-auto gap-4 flex-wrap">
      <div className="flex"></div>
    </div>
  )
}