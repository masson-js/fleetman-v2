import Header from "@/app/components/Header";


export default function ExtendedInfoFixture() {

  
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
     
        <div className="flex flex-col mt-0 w-auto h-auto">
          <h1 className="mx-6 text-3xl font-bold italic opacity-85">
            Fixtures
          </h1>
        </div>
      </div>
    </div>
  );
}
