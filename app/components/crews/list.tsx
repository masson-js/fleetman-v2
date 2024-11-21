import { getAllCrewMembers } from "@/actions"; // Assume this function fetches the list of crew members
import { CrewEnhancedButton } from "../buttons"; // Assume this button component is similar to FixtureEnhancedButton

export default async function CrewList() {
  const crewMembers = await getAllCrewMembers(); // Fetching all crew members

  return (
    <div className="m-6 flex w-auto h-auto items-start">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
        <thead>
          <tr className="items-center">
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tl-lg w-36">
              Name
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Ship
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Role
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Join Date
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Contract End
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Status
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Qualifications
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Certifications
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tr-lg w-28">
              Nationality
            </th>
          </tr>
        </thead>
        <tbody>
          {crewMembers.map((crew) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={crew.id}
            >
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.name}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.ship.name}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.role}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {new Date(crew.joinDate).toLocaleDateString("en-US")}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.contractEndDate
                    ? new Date(crew.contractEndDate).toLocaleDateString("en-US")
                    : "N/A"}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.status}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.qualifications || "N/A"}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.certifications || "N/A"}
                </CrewEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CrewEnhancedButton crewId={crew.id}>
                  {crew.nationality || "N/A"}
                </CrewEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
