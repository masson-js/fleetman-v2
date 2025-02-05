import { getSession } from "@/actions/session";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";



import ShipCardCertification from "./components/card";
import CertificationData from "./components/data";
import CertificationDataViz from "../components/dataviz/certifications/certification-dataviz";

export default async function Certifications() {
  const session = await getSession();

  if (!session || !session.isLoggedIn) {
    return <div>You have to LogIn</div>;
  }

  return (
    <div className="flex flex-col h-screen animate-fade-in mb-40">
      <Header />
      <div className="flex m-6 justify-center animate-fade-in gap-4">
   
        <div className="flex flex-row mt-0 ml-20 w-auto h-auto animate-fade-in gap-4">
          <ShipCardCertification />
         
        </div>
        <CertificationData />
      </div>
    </div>
  );
}
