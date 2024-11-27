import {
  getAllCertifications,
  getAllCrewMembers,
  getAllFixtures,
  getAllInspections,
  getAllLogbooks,
  getAllUserShips,
  getTotalArraysCount,
} from "@/actions";

export default async function StatusData() {
  const {
    certificationsCount,
    fuelRecordsCount,
    routesCount,
    inspectionsCount,
    fixturesCount,
    crewCount,
    logbooksCount,
    shipsCount,
  } = await getTotalArraysCount();

  // const ships = await getAllUserShips();
  // const crews = await getAllCrewMembers();
  // const fixtures = await getAllFixtures();
  // const logbooks = await getAllLogbooks();
  // const inspections = await getAllInspections();
  // const certifications = await getAllCertifications();
  // const routes = [];

  return (
    <div className="flex flex-col mt-6 w-40 h-auto bg-gray-200">
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Ships:</h2>
        <h2 className="text-lg font-semibold">{shipsCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Inspections:</h2>
        <h2 className="text-lg font-semibold">{inspectionsCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Certifications:</h2>
        <h2 className="text-lg font-semibold">{certificationsCount}</h2>
      </div>
      <div className="flex flex-row items-center flex-wrap gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Crew members:</h2>
        <h2 className="text-lg font-semibold">{crewCount}</h2>
      </div>
      <div className="flex flex-row gap-1 mt-6 ml-3 items-center">
        <h2 className="text-sm font-thin">Fixtures:</h2>
        <h2 className="text-lg font-semibold">{fixturesCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Logbooks:</h2>
        <h2 className="text-lg font-semibold">{logbooksCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Routes:</h2>
        <h2 className="text-lg font-semibold">{routesCount}</h2>
      </div>
    </div>
  );
}
