import HeaderHome from "@/app/components/HeaderHome";
import Footer from "./components/footer";

import Logo from "./components/logo";
import Waves from "./components/waves";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full h-screen justify-between animate-fade-in">
      <HeaderHome />
      <Logo />
      <Waves />
      <Footer />
    </div>
  );
}
