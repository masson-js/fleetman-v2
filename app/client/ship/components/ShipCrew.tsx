'use client';

import { UniversalRouterButton } from "@/app/components/buttons";

interface CrewMember {
  id: string;
  name: string;
  certifications: string | null;
  shipId: string;
  role: string;
  rank: string | null;
  joinDate: Date;
  contractEndDate: Date | null;
  status: string;
  qualifications: string | null;
  leaveDate: Date | null;
  nationality: string | null;
}

interface ShipCrewProps {
  crew: CrewMember[];
}

export default function ShipCrew({ crew }: ShipCrewProps) {
  return (
    <div className="flex animate-fade-in flex-col bg-white w-4/6 mx-auto h-full mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-[#70369d]">Crew Members</h2>
      </div>

      {crew && crew.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-white text-black text-xs border-b-4 border-[#57c4ff5b]">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Nationality</th>
                <th className="p-3 text-left">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {crew.map((member, index) => (
                <tr
                  key={member.id}
                  className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                    index === crew.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  <td className="p-3 text-xs whitespace-nowrap">
                    <UniversalRouterButton pathRoute="crews" pathSlug={member.id}>
                      {member.name}
                    </UniversalRouterButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <UniversalRouterButton pathRoute="crews" pathSlug={member.id}>
                      {member.role}
                    </UniversalRouterButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <UniversalRouterButton pathRoute="crews" pathSlug={member.id}>
                      {member.rank || 'N/A'}
                    </UniversalRouterButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <UniversalRouterButton pathRoute="crews" pathSlug={member.id}>
                      {member.status}
                    </UniversalRouterButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <UniversalRouterButton pathRoute="crews" pathSlug={member.id}>
                      {member.nationality || 'N/A'}
                    </UniversalRouterButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <UniversalRouterButton pathRoute="crews" pathSlug={member.id}>
                      {new Date(member.joinDate).toLocaleDateString('en-US')}
                    </UniversalRouterButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No crew members available.</p>
        </div>
      )}
    </div>
  );
}
