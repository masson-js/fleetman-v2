import Footer from "@/app/components/footer";
import { redirect } from "next/navigation";
import Waves from "../../components/waves";
import { getSession } from "@/actions/session";
import RegistrationForm from "@/app/components/forms/registration";


export default async function Registration() {

  const session = await getSession();
  
  if (session.userId) {
    redirect("/pages/status");
  }
  return (
    <div className="flex flex-col w-full h-screen justify-between">
      <div className="flex flex-col flex-wrap w-auto h-auto items-center ">
        <RegistrationForm />
      </div>
      <Waves />
      <Footer />
    </div>
  );
}
