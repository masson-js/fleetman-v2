"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCrewMember } from "@/actions";
import SideNavigation from "@/app/components/sidenavigation";
import Header from "@/app/components/header";
import ExtendedData from "@/app/components/crews/extended";
import Link from "next/link";

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
    return <div>Loading...</div>;
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
        <div className="flex w-auto h-auto justify-start">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <h1 className="mx-6 mt-6 text-3xl font-bold italic opacity-85 ">
                Crew Member Details:
              </h1>
              <div className="flex flex-col w-60 h-60 bg-gray-300 mt-6">
                <img src="/eugen.jpeg" />
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col mt-6 ">
                <p className="text-lg">
                  Name:
                  <span className="text-xl font-semibold ml-2">
                    {memberInfo.name}
                  </span>
                </p>
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
