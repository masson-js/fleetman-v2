import { getSession } from "@/actions/session";

import Header from "../components/Header";


import StatusData from "./components/data";
import StatusList from "./components/list";
import StatusDataViz from "../components/dataviz/status/status-dataviz";


export default async function Test() {
  const session = await getSession();


  if (!session || !session.isLoggedIn) {
    return <div>Sorry you have to log in</div>;
  }

  return (
    <div className="flex flex-col h-screen animate-fade-in mb-40">
      <Header />
      <div className="flex m-6 justify-between animate-fade-in w-auto h-auto">
        <div className="flex flex-col mt-0 ml-20 w-auto h-auto animate-fade-in items-center">
          <StatusList />
          <StatusDataViz />
        </div>
        <StatusData />
      </div>
    </div>
  );
}
