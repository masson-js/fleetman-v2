export default function HomeInfo() {
  return (
    <div className="relative flex w-1/2 items-center flex-col bg-gray-200 text-gray-800">
      <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-15 z-0"></div>
      <div className="relative z-10">
        <h1 className="text-6xl mt-24 my-4 mx-12 text-center opacity-75">Welcome to</h1>
        <h2 className="text-9xl mx-12 my-10 text-center font-bold">Fleet Manager</h2>
        <h3 className="text-xl mx-12 my-4 text-center italic opacity-75">application for navigation in your marine business</h3>
      </div>
    </div>
  );
}