"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCrewMember } from "@/actions/crew";
import SideNavigation from "@/app/components/sidenavigation";
import Link from "next/link";
import WaveIcon from "@/app/components/waveicon";

export default function CrewDetails() {
  const params = useParams();
  const memberID = Array.isArray(params.crewMember)
    ? params.crewMember[0]
    : params.crewMember;

  const [memberInfo, setMemberInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memberID) {
      const fetchMemberData = async () => {
        try {
          setLoading(true);
          const data = await getCrewMember({ memberID });
          setMemberInfo(data);
        } catch (err) {
          setError("Error fetching crew member");
        } finally {
          setLoading(false);
        }
      };
      fetchMemberData();
    }
  }, [memberID]);

  if (loading) {
    return (
      <div className="flex content-center">
        <WaveIcon />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col">
      <header className="flex w-auto h-16 bg-gray-200 items-center">
        <Link className="ml-12 text-lg font-bold" href="/crews">
          {" "}
          {`< GO BACK`}
        </Link>
      </header>
      <div className="flex w-auto h-auto m-6 flex-row justify-start">
        <SideNavigation />
        <div className="flex w-auto h-auto justify-start ml-10">
          <div className="flex gap-4 h-auto">
            <div className="flex flex-col items-center h-auto">
              <h1 className="mx-6 mt-6 text-3xl font-bold italic opacity-85 w-auto ">
                {memberInfo.name}
              </h1>
              <div className="flex flex-col w-60 h-6 mt-6">
                <img className="flex rounded-full" src="/crew.webp" />
              </div>
            </div>
            <div className="flex ml-6 h-auto">
              <div className="flex flex-col mt-6 border-l-4 border-blue-400 pl-6 h-auto">
                <p className="text-lg">
                  Role:
                  <span className="text-xl font-semibold ml-2">
                    {memberInfo.role}
                  </span>
                </p>
                <p className="text-lg">
                  Nationality:
                  <span className="text-xl font-semibold ml-2">
                    {memberInfo.nationality}
                  </span>
                </p>
                <p className="text-lg">
                  Status:
                  <span className="text-xl font-semibold ml-2">
                    {memberInfo.status}
                  </span>
                </p>
                <p className="text-lg">
                  Joined:
                  <span className="text-xl font-semibold ml-2">
                    {new Date(memberInfo.joinDate).toLocaleDateString("en-US")}
                  </span>
                </p>
                <p className="text-lg">
                  Contract Ended:
                  <span className="text-xl font-semibold ml-2">
                    {new Date(memberInfo.contractEndDate).toLocaleDateString(
                      "en-US"
                    )}
                  </span>
                </p>
                <p className=" flex flex-row text-lg w-96 text-wrap">
                  Qualifications:
                  <span className="text-sm font-sans ml-2 mt-2">
                    {memberInfo.qualifications}
                  </span>
                </p>
                <p className=" flex flex-row text-lg w-96 text-wrap">
                  Certifications:
                  <span className="text-sm font-sans ml-2 mt-2">
                    {memberInfo.certifications}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
