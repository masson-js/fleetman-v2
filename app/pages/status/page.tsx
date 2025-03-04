import Header from "@/app/components/Header";
import GlobalStatus from "./components/GlobalStatus";
import { getAllUserData } from "@/actions/counts";
import ShipList from "./components/ShipList";
import InspectionsStatus from "./components/InspectionsStatus";
import CertificatesStatus from "./components/CertificationsStatus";
import FixturesStatus from "./components/FixturesStatus";
import FleetAnalyticsD3 from "./components/analitics";
import LogbooksStatus from "./components/LogbooksStatus";
import CrewStatus from "./components/CrewStatus";
import DataViz from "./components/DataViz";

export default async function StatusPage() {
  const allData = await getAllUserData();

  const shipCount = allData.ships.length;
  const inspectionsCount = allData.inspections.length;
  const certificationCount = allData.certifications.length;
  const fixturesCount = allData.fixtures.length;
  const totalProfit = allData.totalProfit;
  const totalLogbooks = allData.crewMembers.length;
  const totalFuelRecords = allData.fuelRecords.length;
  const totalRoutes = allData.routes.length;

  const inspections = allData.inspections.map((insp) => ({
    ...insp,
    inspectionDate: new Date(insp.inspectionDate),
    nextInspectionDate: insp.nextInspectionDate
      ? new Date(insp.nextInspectionDate)
      : null,
    verificationStatus: insp.verificationStatus as
      | "passed"
      | "failed"
      | "requires-work",
  }));

  const fixtures = allData.fixtures.map((fixture) => ({
    ...fixture,
    startDate: new Date(fixture.startDate).toISOString(),
    endDate: new Date(fixture.endDate).toISOString(),
    totalCost: fixture.totalCost || 0,
  }));

  const certifications = allData.certifications;
  const formattedShips = allData.ships.map((ship) => ({
    id: ship.id,
    name: ship.name,
    type: ship.type,
    flag: ship.flag,
    imoNumber: ship.imoNumber,
    mmsi: ship.mmsi,
    callsign: ship.callsign,
    portOfRegistry: ship.portOfRegistry,
    ecoStandard: ship.ecoStandard,
    yearBuilt: String(ship.yearBuilt),
  }));

  const logbooks = allData.logbooks;
  const crewMembers = allData.crewMembers;

  return (
    <div className="bg-blue-50 ">
      <Header />
      <div className="flex flex-col animate-fade-in bg-blue-50 items-center w-4/5 mx-auto">
        <GlobalStatus
          shipCount={shipCount}
          inspectionsCount={inspectionsCount}
          certificationCount={certificationCount}
          fixturesCount={fixturesCount}
          totalProfit={totalProfit}
          totalLogbooks={totalLogbooks}
          totalFuelRecords={totalFuelRecords}
          totalRoutes={totalRoutes}
        />
        <ShipList ships={formattedShips} />
      </div>
      <div className="flex flex-row flex-wrap w-4/5 mx-auto bg-blue-50 justify-between">
        <InspectionsStatus inspections={inspections} />
        <CertificatesStatus certificates={certifications} />
        <FixturesStatus fixtures={fixtures} />
        <LogbooksStatus logbooks={logbooks} />
        <CrewStatus crewMembers={crewMembers} />
      </div>
      <div className="flex bg-blue-50 w-4/5 mx-auto justify-center">
        <DataViz fixtures={fixtures} ships={formattedShips} />
      </div>
    </div>
  );
}
