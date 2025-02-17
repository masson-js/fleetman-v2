import Footer from "@/app/components/footer";
import Waves from "../home/components/waves";
import LoginForm from "@/app/components/forms/login";


export default function Login() {
  return (
    <div className="flex flex-col w-full h-screen justify-between animate-fade-in">
      <div className="flex flex-col flex-wrap w-auto h-auto items-center ">
        <LoginForm />
      </div>
      <Waves />
      <Footer />
    </div>
  );
}
