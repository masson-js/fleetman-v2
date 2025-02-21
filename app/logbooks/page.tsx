import Header from "../components/Header";


import LogBookData from "./components/data";

import ShipCardLogbook from "./components/card";

export default async function Logbooks() {
  return (
    <div className="flex flex-col h-screen animate-fade-in mb-40">
      <Header />
      <div className="flex m-6 justify-between animate-fade-in">
       <ShipCardLogbook/>
        <LogBookData/>
      </div>
    </div>
  );
}


