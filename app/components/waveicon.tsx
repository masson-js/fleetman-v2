"use client"

const WaveIcon = () => {
  return (
    <>
      <div className="icon"></div>
      <style jsx>{`
        .icon {
          width: 100px;
          height: 100px;
          background: url('/logo-loading.png') no-repeat center/contain;
          animation: wave 3s infinite ease-in-out;
          
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
