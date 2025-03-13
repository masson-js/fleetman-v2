"use client";

interface CrewMember {
  id: string;
  shipId: string;
  name: string;
  role: string;
  rank: string | null;
  joinDate: Date;
  contractEndDate: Date | null;
  status: string;
  qualifications: string | null;
  certifications: string | null;
  leaveDate: Date | null;
  nationality: string | null;
}

interface CrewStatusProps {
  crewMembers: CrewMember[];
}

export default function CrewStatus({ crewMembers }: CrewStatusProps) {
  const totalCrew = crewMembers.length;
  const activeCrew = crewMembers.filter((member) => member.status === "active").length;
  const onLeaveCrew = crewMembers.filter((member) => member.status === "on leave").length;
  const crewWithContracts = crewMembers.filter((member) => member.contractEndDate).length;
  const lastJoinDate =
    crewMembers.length > 0
      ? new Date(
          Math.max(...crewMembers.map((member) => new Date(member.joinDate).getTime()))
        ).toISOString().split("T")[0]
      : "No records";

  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl hover:bg-[#57C4FF] text-black hover:text-white hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4">Crew</h2>
        <div className="space-y-3">
         

          <div className="flex items-center justify-between p-2 bg-green-100 rounded-md text-xs">
            <span className="text-green-600">Active</span>
            <span className="font-semibold text-green-800 ml-2">{activeCrew}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-yellow-100 rounded-md text-xs">
            <span className="text-yellow-600">On Leave</span>
            <span className="font-semibold text-yellow-800 ml-2">{onLeaveCrew}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-xs">
            <span className="text-gray-600">Contracts</span>
            <span className="font-semibold text-gray-800 ml-2">{crewWithContracts}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-purple-100 rounded-md text-xs">
            <span className="text-purple-600">Last Join</span>
            <span className="font-semibold text-purple-800 ml-2">{lastJoinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
