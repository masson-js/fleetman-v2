import Footer from "@/app/components/footer";
import Waves from "../../components/waves";

import { redirect } from "next/navigation";
import { getSession } from "@/actions/session";
import LoginForm from "@/app/components/forms/login";

export default async function Login() {
  const session = await getSession();

  if (session.userId) {
    redirect("/pages/status");
  }

  return (
    <div className="flex flex-col w-full h-screen justify-between">
      <div className="flex flex-col flex-wrap w-auto h-auto items-center ">
        <LoginForm />
      </div>
      <Waves />
      <Footer />
    </div>
  );
}
