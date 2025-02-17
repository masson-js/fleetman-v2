export default function Waves() {
  return (
    <div className="relative w-full flex-grow mt-auto h-48">
      <div className="absolute left-0 w-full bottom-0 h-auto wave-item wave-2">
        <img src="/waves/wave-4.svg" alt="Wave 1" className="w-full h-auto" />
      </div>

      <div className="absolute left-0 w-full bottom-0 h-auto wave-item wave-3">
        <img src="/waves/wave-3.svg" alt="Wave 2" className="w-full h-auto" />
      </div>

      <div className="absolute left-0 w-full bottom-0 h-auto wave-item wave-2">
        <img src="/waves/wave-2.svg" alt="Wave 3" className="w-full h-auto" />
      </div>

      <div className="absolute left-0 w-full bottom-0 h-auto">
        <img src="/waves/wave-1.svg" alt="Wave 4" className="w-full h-auto" />
      </div>
    </div>
  );
}
