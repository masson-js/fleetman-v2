import Footer from "./components/footer";
import HomeHeader from "./components/header";
import Logo from "./components/logo";
import Waves from "./components/waves";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full h-screen justify-between animate-fade-in">
      <HomeHeader />
      <Logo />
      <Waves />
      <Footer />
    </div>
  );
}
