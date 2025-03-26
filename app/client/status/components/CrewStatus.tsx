"use client";

import Link from "next/link";

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
  const activeCrew = crewMembers.filter(
    (member) => member.status === "active"
  ).length;
  const onLeaveCrew = crewMembers.filter(
    (member) => member.status === "on leave"
  ).length;
  const crewWithContracts = crewMembers.filter(
    (member) => member.contractEndDate
  ).length;
  const lastJoinDate =
    crewMembers.length > 0
      ? new Date(
          Math.max(
            ...crewMembers.map((member) => new Date(member.joinDate).getTime())
          )
        )
          .toISOString()
          .split("T")[0]
      : "No records";

  return (
    <Link href="/client/inspections">
      <div className="">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border-2 border-solid h-80 border-white hover:border-[#57C4FF] hover:border-2 hover:border-solid text-black hover:cursor-pointer transform transition-all duration-300">
          <h2 className="text-sm font-semibold mb-4">Crew</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-l-4 border-green-400  text-xs">
              <span className="">Active</span>
              <span className="font-semibold  ml-2">{activeCrew}</span>
            </div>

            <div className="flex items-center justify-between p-2 text-xs border-l-4 border-yellow-400">
              <span className="">On Leave</span>
              <span className="font-semibold  ml-2">{onLeaveCrew}</span>
            </div>

            <div className="flex items-center justify-between p-2 text-xs">
              <span className="">Contracts</span>
              <span className="font-semibold  ml-2">{crewWithContracts}</span>
            </div>

            <div className="flex items-center justify-between p-2 text-xs">
              <span className="">Last Join</span>
              <span className="font-semibold ml-2">{lastJoinDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
