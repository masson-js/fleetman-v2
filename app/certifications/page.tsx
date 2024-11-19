import {  getSession } from "@/actions";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

import CertificationList from "../components/certifications/list";
import { useParams } from "next/navigation";

export default async function Certifications() {
  const session = await getSession();
 

  if (!session || !session.isLoggedIn) {
    return <div>Извините, вам нужно войти в систему, чтобы увидеть данные</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex m-6">
        <SideNavigation />
        <div className="flex flex-col mt-0 w-auto h-auto">
          <h1  className="mx-6 text-3xl font-bold italic opacity-85">Certifications</h1>
          <CertificationList />
        </div>
      </div>
    </div>
  );
}
