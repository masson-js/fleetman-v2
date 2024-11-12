import HomeInfo from "./components/homeinfo";
import HomeNavigation from "./components/homenavigation";



export default function Home() {
  return (
    <main className="flex flex-col w-full h-auto">
      <div className="flex flex-row w-full">
        <HomeInfo />
        <HomeNavigation />
      </div>
        <div className="w-full h-96 bg-gray-300">About Application</div>
        <div className="w-full h-96 bg-gray-100">About Status</div>
        <div className="w-full h-96 bg-gray-200">About Map</div>
    </main>
  );
}