import Header from "@/app/components/Header";
import StatusList from "./components/list";

import { getAllUserShips } from "@/actions/ship";
import {getAllInspections} from "@/actions/inspection"
import GlobalStatus from "./components/GlobalStatus";
import { getAllCertifications } from "@/actions/certification";
import { getAllUserData } from "@/actions/counts";




export default async function StatusPage() {
  const userShips = await getAllUserShips();
  const userInspections = await getAllInspections();
  const  userCertifications = await getAllCertifications()

  const allData = await getAllUserData()




  const shipCount = allData.ships.length
  const inspectionsCount = allData.inspections.length
  const certificationCount = allData.certifications.length
  const fixturesCount = allData.fixtures.length
  const totalProfit = allData.totalProfit
 


  return (
    <div className="flex flex-col w-full h-screen animate-fade-in bg-stone-100">
      <Header />
      <GlobalStatus shipCount={shipCount} inspectionsCount={inspectionsCount} certificationCount={certificationCount} fixturesCount={fixturesCount} totalProfit={totalProfit}/>
      {/* <StatusList /> */}
    </div>
  );
}
