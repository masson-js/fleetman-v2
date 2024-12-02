
import RegistrationForm from "../components/forms/registration";


export default function Registration() {
  return (
    <main className="flex w-full h-screen animate-fade-in">
      <div className="relative flex w-1/2 items-center justify-center flex-col bg-gray-200 text-gray-800">
        <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-15 z-0"></div>

        <div className="relative z-10 text-center">
          
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] mx-12 my-10 font-bold">
            Fleet Manager
          </h2>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mx-12 my-4 italic opacity-75">
            application for navigation in your marine business
          </h3>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-green-300">
        <RegistrationForm />
      </div>
    </main>
  );
}
