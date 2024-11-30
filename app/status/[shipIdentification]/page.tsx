"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getShipDetails } from "@/actions/ship";

import SideNavigation from "@/app/components/sidenavigation";

import WaveIcon from "@/app/components/waveicon";
import {
  CertificationEnhancedButton,
  CrewEnhancedButton,
  InspectionEnhancedButton,
} from "@/app/components/buttons";

export default function ShipDetails() {
  const params = useParams();
  const shipID = Array.isArray(params.shipIdentification)
    ? params.shipIdentification[0]
    : params.shipIdentification;

  const [shipInfo, setShipInfo] = useState<any>(null);
  const [crews, setCrews] = useState<any>(null);
  const [inspections, setInspections] = useState<any>(null);
  const [certifications, setCertifications] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shipID) {
      const fetchShipData = async () => {
        try {
          setLoading(true);
          const data = await getShipDetails(shipID);

          // Установка состояний
          setShipInfo({
            id: data?.id,
            name: data?.name,
            type: data?.type,
            flag: data?.flag,
            imoNumber: data?.imoNumber,
            mmsi: data?.mmsi,
            callsign: data?.callsign,
            deadweight: data?.deadweight,
            length: data?.length,
            beam: data?.beam,
            width: data?.width,
            yearBuilt: data?.yearBuilt,
            currentStatus: data?.currentStatus,
            portOfRegistry: data?.portOfRegistry,
            ecoStandard: data?.ecoStandard,
          });
          setCrews(data?.crew || []);
          setInspections(data?.inspections || []);
          setCertifications(data?.certifications || []);
        } catch (err) {
          console.error(err);
          setError("Error fetching ship data");
        } finally {
          setLoading(false);
        }
      };

      fetchShipData();
    }
  }, [shipID]);

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
                  {crews && crews.length > 0 ? (
                    crews.map((member: any) => (
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

                  {inspections && inspections.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {inspections.map((inspection: any) => (
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
                  {certifications && certifications.length > 0 ? (
                    certifications.map((certificate: any) => (
                      <CertificationEnhancedButton
                        certificate={certificate.id}
                        key={certificate.id}
                      >
                        <p
                          className="text-sm hover:underline items-start"
                          key={certificate.id}
                        >
                          <span className="text-sm font-thin  ">
                            {certificate.type}
                          </span>
                          <span className="text-sm font-bold ml-2"></span>
                        </p>
                      </CertificationEnhancedButton>
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
