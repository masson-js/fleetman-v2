import Footer from "@/app/components/footer";
import Waves from "../home/components/waves";

import PasswordRocoverForm from "@/app/components/forms/passwordrecover";


export default function PasswordRecover() {
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
