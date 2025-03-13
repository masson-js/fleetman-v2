"use client";

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
    <div className="col-span-1 bg-white border-[#57c4ff5f] border-2 border-solid rounded-lg p-4 text-black ">
      <div className="flex items-center mb-2">
        <h2 className="text-sm font-bold text-gray-800">Crew Members</h2>
      </div>

      {crew && crew.length > 0 ? (
        <div className="space-y-1">
          {crew.map((member) => (
            <UniversalRouterButton
              pathRoute="crews"
              pathSlug={member.id}
              key={member.id}
            >
              <div className="flex justify-between items-center p-1 hover:bg-[#57C4FF] rounded-md transition-colors duration-300">
                <div>
                  <p className="font-thin text-xs">{member.name}</p>
                  <p className="text-xs text-gray-500 group-hover:text-white">
                    {member.role}
                  </p>
                </div>
                <div className="text-xs text-black group-hover:text-white">
                  {member.nationality && <span>{member.nationality}</span>}
                </div>
              </div>
            </UniversalRouterButton>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No crew members available.</p>
        </div>
      )}
    </div>
  );
}
