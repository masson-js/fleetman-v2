'use client'
const WaveIcon = () => {
  return (
    <>
      <div className="icon"></div>
      <style jsx>{`
        .icon {
          width: 50px;
          height: 50px;
          background: url('/transportation.png') no-repeat center/contain;
          animation: wave 3s infinite ease-in-out;
          position: absolute; /* Центрирование иконки */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes wave {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          25% {
            transform: translate(calc(-50% - 10px), calc(-50%)) rotate(-5deg);
          }
          50% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          75% {
            transform: translate(calc(-50% + 10px), calc(-50%)) rotate(5deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
      `}</style>
    </>
  );
};

export default WaveIcon;