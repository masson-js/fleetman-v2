import Header from "@/app/components/Header";
import GlobalStatus from "./components/GlobalStatus";
import { getAllUserData } from "@/actions/counts";
import ShipList from "./components/ShipList";
import InspectionsStatus from "./components/InspectionsStatus";
import CertificatesStatus from "./components/CertificationsStatus";
import FixturesStatus from "./components/FixturesStatus";

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

  // Преобразуем даты для инпекций
  const inspections = allData.inspections.map((insp) => ({
    ...insp,
    inspectionDate: new Date(insp.inspectionDate),
    nextInspectionDate: insp.nextInspectionDate
      ? new Date(insp.nextInspectionDate)
      : null,
    verificationStatus: insp.verificationStatus as "passed" | "failed" | "requires-work",
  }));

  // Преобразуем данные фрахтов для передачи в компонент
  const fixtures = allData.fixtures.map((fixture) => ({
    ...fixture,
    startDate: new Date(fixture.startDate).toISOString(), // Преобразуем в строку ISO
    endDate: new Date(fixture.endDate).toISOString(),     // Преобразуем в строку ISO
    totalCost: fixture.totalCost || 0, // Обработка null значений
  }));

  const certifications = allData.certifications; // Данные для сертификатов
  const ships = allData.ships; // Данные для судов

  return (
    <div className="flex flex-col w-full h-screen animate-fade-in bg-stone-100">
      <Header />
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
      <div className="flex flex-row">
        <ShipList ships={ships} />
        <InspectionsStatus inspections={inspections} />
        <CertificatesStatus certificates={certifications} />
        <FixturesStatus fixtures={fixtures} />
      </div>
    </div>
  );
}
