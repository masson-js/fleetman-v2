import Footer from "@/app/components/footer";
import Waves from "../home/components/waves";
import { getSession } from "@/actions/session";
import PasswordRocoverForm from "@/app/components/forms/passwordrecover";
import { redirect } from "next/navigation";

export default async function PasswordRecover() {
  const session = await getSession();

  if (session.userId) {
    redirect("/pages/status");
  }

  return (
    <div className="flex flex-col w-full h-screen justify-between animate-fade-in">
      <div className="flex flex-col flex-wrap w-auto h-auto items-center ">
        <PasswordRocoverForm />
      </div>
      <Waves />
      <Footer />
    </div>
  );
}
