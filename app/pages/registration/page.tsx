import Footer from "@/app/components/footer";
import Waves from "../home/components/waves";

import RegistrationForm from "@/app/components/forms/registration";


export default function Registration() {
  return (
    <div className="flex flex-col w-full h-screen justify-between animate-fade-in">
      <div className="flex flex-col flex-wrap w-auto h-auto items-center ">
        <RegistrationForm />
      </div>
      <Waves />
      <Footer />
    </div>
  );
}
