import { getShipDetails } from "@/actions/ship";
import {
  InspectionEnhancedButton,
  UniversalRouterButton,
} from "@/app/components/buttons";
import Header from "@/app/components/Header";

import WaveIcon from "@/app/components/waveicon";

export default async function ShipDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const shipID = (await params).id

  const ship = await getShipDetails(shipID);
  const {
    fuelRecords,
    routes,
    logbooks,
    crew,
    inspections,
    fixtures,
    certifications,
  } = ship;

  if (ship.length === 0) {
    return (
      <div className="flex content-center">
        <WaveIcon />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row justify-start mb-20">
  
        <div className="flex w-auto h-auto justify-start ml-10">
          <div className="flex gap-4 h-auto">
            <div className="flex flex-col items-center h-auto">
              <h1 className="mx-6 mt-6 text-3xl font-bold italic opacity-85 w-auto ">
                {ship.name}
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
                        ship.currentStatus === "in port"
                          ? "bg-green-500 text-white"
                          : ship.currentStatus === "on the way"
                          ? "bg-blue-500 text-white"
                          : ship.currentStatus === "waiting"
                          ? "bg-yellow-500 text-white"
                          : ship.currentStatus === "fix"
                          ? "bg-red-500 text-white"
                          : ship.currentStatus === "other"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {ship.currentStatus}
                    </span>
                  </p>
                  <p className="text-sm">
                    Type:
                    <span className="text-sm font-bold ml-2">{ship.type}</span>
                  </p>

                  <p className="text-sm">
                    Flag:
                    <span className="text-sm font-bold ml-2">{ship.flag}</span>
                  </p>
                  <p className="text-sm">
                    City:
                    <span className="text-sm font-bold ml-2">
                      {ship.portOfRegistry}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col pt-2 pb-2 border-b-2 border-gray-400">
                  <p className="text-sm ">
                    Callsign:
                    <span className="text-sm font-bold ml-2">
                      {ship.callsign}
                    </span>
                  </p>
                  <p className="text-sm ">
                    IMO:
                    <span className="text-sm font-bold ml-2">
                      {ship.imoNumber}
                    </span>
                  </p>
                  <p className="text-sm ">
                    MMSI:
                    <span className="text-sm font-bold ml-2">{ship.mmsi}</span>
                  </p>
                  <p className="text-sm ">
                    ECO Standart:
                    <span className="text-sm font-bold ml-2">
                      {ship.ecoStandard}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col pt-2   border-gray-400">
                  <p className="text-sm ">
                    Year of built:
                    <span className="text-sm font-bold ml-2">
                      {ship.yearBuilt}
                    </span>
                  </p>
                  <p className="text-sm ">
                    Deadweight:
                    <span className="text-sm font-bold ml-2">
                      {ship.deadweight}
                    </span>
                  </p>

                  <p className="text-sm ">
                    Length:
                    <span className="text-sm font-bold ml-2">
                      {ship.length}
                    </span>
                  </p>
                  <p className="text-sm ">
                    Width:
                    <span className="text-sm font-bold ml-2">{ship.width}</span>
                  </p>
                  <p className="text-sm ">
                    Beam:
                    <span className="text-sm font-bold ml-2">{ship.beam}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col mt-6 border-l-4 border-green-500 pl-6 h-auto">
                <div className="flex flex-col pb-2 items-start">
                  <h2 className="text-lg font-bold items-start">Crew:</h2>
                  {crew && crew.length > 0 ? (
                    crew.map((member: any) => (
                      <UniversalRouterButton
                        pathRoute="crews"
                        pathSlug={member.id}
                        key={member.name}
                      >
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
                      </UniversalRouterButton>
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
                      <UniversalRouterButton
                        pathRoute="certifications"
                        pathSlug={certificate.id}
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
                      </UniversalRouterButton>
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
