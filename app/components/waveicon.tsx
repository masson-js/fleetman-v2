"use client"

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
            transform: translate(-50%, -50%) translateY(0);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-10px); /* Icon moves up */
          }
          50% {
            transform: translate(-50%, -50%) translateY(0);
          }
          75% {
            transform: translate(-50%, -50%) translateY(-10px); /* Icon moves up again */
          }
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default WaveIcon;