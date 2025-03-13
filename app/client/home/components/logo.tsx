export default function Logo() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 pointer-events-none">
      <img src="/logo/logo.svg" alt="logo" className="w-3/4 md:w-1/2 lg:w-1/4 h-auto"/>
    </div>
  );
}
