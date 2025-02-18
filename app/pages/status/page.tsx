import Header from "@/app/components/Header";
import StatusList from "./components/list";






export default function StatusPage() {
  return (
    <div className="flex flex-col w-full h-screen animate-fade-in">
    
      <Header/>
      <StatusList/>
    </div>
  )
}
