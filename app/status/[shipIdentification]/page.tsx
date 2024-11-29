"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getAllCrewMembers,
  getCrewMembersByShipId,
  getInspectionsByShipId,
  getShipStatus,
} from "@/actions";
import SideNavigation from "@/app/components/sidenavigation";
import Link from "next/link";
import WaveIcon from "@/app/components/waveicon";
import {
  CrewEnhancedButton,
  InspectionEnhancedButton,
} from "@/app/components/buttons";

export default function ShipDetails() {
  const params = useParams();
  const shipID = Array.isArray(params.shipIdentification)
    ? params.shipIdentification[0]
    : params.shipIdentification;

  const [shipInfo, setShipInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [shipCrewInfo, setShipCrewInfo] = useState<any>(null);
  const [crewLoading, setCrewLoading] = useState<boolean>(true);

  const [shipInspectionsInfo, setShipInspectionsInfo] = useState<any>(null);
  const [inspectionsLoading, setInspectionsLoading] = useState<boolean>(true);

  const [shipCertificationInfo, setCertificationInfo] = useState<any>(null);
  const [certificationLoading, setCertificationLoading] = useState<boolean>(true);

  useEffect(() => {
    if (shipID) {
      const fetchShipData = async () => {
        try {
          setLoading(true);
          const data = await getShipStatus({ shipID });
          setShipInfo(data);
        } catch (err) {
          setError("Error fetching ship data");
        } finally {
          setLoading(false);
        }
      };

      const fetchShipCrewData = async () => {
        try {
          setCrewLoading(true);
          const data = await getCrewMembersByShipId(shipID);
          setShipCrewInfo(data);
        } catch (err) {
          setError("Error fetching crew members");
        } finally {
          setCrewLoading(false);
        }
      };

      const fetchShipInspectionsData = async () => {
        try {
          setInspectionsLoading(true);
          const data = await getInspectionsByShipId(shipID);
          setShipInspectionsInfo(data);
        } catch (err) {
          setError("Error fetching inspections");
        } finally {
          setInspectionsLoading(false);
        }
      };

      fetchShipData();
      fetchShipCrewData();
      fetchShipInspectionsData();
    }
  }, [shipID]);

  if (loading || crewLoading || inspectionsLoading) {
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
        <Link className="ml-12 text-lg font-bold" href="/status">
          {" "}
          {`< GO BACK`}
        </Link>
      </header>
      <div className="flex w-auto h-auto m-6 flex-row justify-start mb-20">
        <SideNavigation />
        <div className="flex w-auto h-auto justify-start ml-10">
          <div className="flex gap-4 h-auto">
            <div className="flex flex-col items-center h-auto">
              <h1 className="mx-6 mt-6 text-3xl font-bold italic opacity-85 w-auto ">
                {shipInfo.name}
              </h1>
              <div className="flex flex-col w-60 h-6 mt-6">
                <img className="flex rounded-full" src="/output.jpg" />
              </div>
            </div>
            <div className="flex flex-col ml-6 h-auto">
              <div className="flex flex-col mt-6 border-l-4 border-blue-400 pl-6 h-auto">
                <h2 className="text-lg font-bold">Info:</h2>
                <div className="flex flex-col pb-2 border-b-2 border-gray-400">
                  <p className="text-sm">
                    Status:
                    <span
                      className={`text-sm font-bold p-1 ${
                        shipInfo.currentStatus === "in port"
                          ? "bg-green-500 text-white"
                          : shipInfo.currentStatus === "on the way"
                          ? "bg-blue-500 text-white"
                          : shipInfo.currentStatus === "waiting"
                          ? "bg-yellow-500 text-white"
                          : shipInfo.currentStatus === "fix"
                          ? "bg-red-500 text-white"
                          : shipInfo.currentStatus === "other"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {shipInfo.currentStatus}
                    </span>
                  </p>
                  <p className="text-sm">
                    Type:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.type}
                    </span>
                  </p>

                  <p className="text-sm">
                    Flag:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.flag}
                    </span>
                  </p>
                  <p className="text-sm">
                    City:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.portOfRegistry}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col pt-2 pb-2 border-b-2 border-gray-400">
                  <p className="text-sm ">
                    Callsign:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.callsign}
                    </span>
                  </p>
                  <p className="text-sm ">
                    IMO:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.imoNumber}
                    </span>
                  </p>
                  <p className="text-sm ">
                    MMSI:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.mmsi}
                    </span>
                  </p>
                  <p className="text-sm ">
                    ECO Standart:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.ecoStandard}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col pt-2   border-gray-400">
                  <p className="text-sm ">
                    Year of built:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.yearBuilt}
                    </span>
                  </p>
                  <p className="text-sm ">
                    Deadweight:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.deadweight}
                    </span>
                  </p>

                  <p className="text-sm ">
                    Length:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.length}
                    </span>
                  </p>
                  <p className="text-sm ">
                    Width:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.width}
                    </span>
                  </p>
                  <p className="text-sm ">
                    Beam:
                    <span className="text-sm font-bold ml-2">
                      {shipInfo.beam}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col mt-6 border-l-4 border-green-500 pl-6 h-auto">
                <div className="flex flex-col pb-2 items-start">
                  <h2 className="text-lg font-bold items-start">Crew:</h2>
                  {shipCrewInfo && shipCrewInfo.length > 0 ? (
                    shipCrewInfo.map((member: any) => (
                      <CrewEnhancedButton crewId={member.id} key={member.name}>
                        <p
                          className="text-sm hover:bg-blue-100 items-start"
                          key={member.id}
                        >
                          <span className="text-sm font-thin  ">
                            {member.name}
                          </span>
                          <span className="text-sm font-bold ml-2">
                            {member.role}
                          </span>
                        </p>
                      </CrewEnhancedButton>
                    ))
                  ) : (
                    <p>No crew members available.</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-6 border-l-4 border-yellow-500 pl-6 h-auto">
                <div className="flex flex-col pb-2 items-start">
                  <h2 className="text-lg font-bold items-start">
                    Inspections:
                  </h2>

                  {shipInspectionsInfo && shipInspectionsInfo.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipInspectionsInfo.map((inspection: any) => (
                          <tr
                            key={inspection.id}
                            className="text-center text-sm hover:bg-blue-100"
                          >
                            <td className="w-20 font-thin">
                              <InspectionEnhancedButton
                                inspectionId={inspection.id}
                              >
                                {new Date(
                                  inspection.inspectionDate
                                ).toLocaleDateString("en-US")}
                              </InspectionEnhancedButton>
                            </td>
                            <td className="w-auto px-2 font-bold">
                              <InspectionEnhancedButton
                                inspectionId={inspection.id}
                              >
                                {inspection.inspectorName}
                              </InspectionEnhancedButton>
                            </td>
                            <td className="w-auto font-bold px-5">
                              <InspectionEnhancedButton
                                inspectionId={inspection.id}
                              >
                                {" "}
                                {inspection.inspectionType}{" "}
                              </InspectionEnhancedButton>
                            </td>
                            <td className="w-auto font-bold px-5">
                              <InspectionEnhancedButton
                                inspectionId={inspection.id}
                              >
                                {" "}
                                {inspection.complianceStandards}{" "}
                              </InspectionEnhancedButton>
                            </td>
                            <td
                              className={`text-sm font-bold px-5 ${
                                inspection.results === "passed"
                                  ? "bg-green-500 text-white"
                                  : inspection.results === "pending"
                                  ? "bg-yellow-500 text-white"
                                  : inspection.results === "failed"
                                  ? "bg-red-500 text-white"
                                  : ""
                              }`}
                            >
                              <InspectionEnhancedButton
                                inspectionId={inspection.id}
                              >
                                {" "}
                                {inspection.results}
                              </InspectionEnhancedButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No inspections available.</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-6 border-l-4 border-orange-500 pl-6 h-auto">
                <div className="flex flex-col pb-2 items-start">
                  <h2 className="text-lg font-bold items-start">
                    Certifications:
                  </h2>
                  {shipCrewInfo && shipCrewInfo.length > 0 ? (
                    shipCrewInfo.map((member: any) => (
                      <InspectionEnhancedButton
                        crewId={member.id}
                        key={member.name}
                      >
                        <p
                          className="text-sm hover:underline items-start"
                          key={member.id}
                        >
                          <span className="text-sm font-thin  ">
                            {member.name}
                          </span>
                          <span className="text-sm font-bold ml-2">
                            {member.role}
                          </span>
                        </p>
                      </InspectionEnhancedButton>
                    ))
                  ) : (
                    <p>No certifications available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
