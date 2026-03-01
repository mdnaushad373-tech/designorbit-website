export default function PremiumBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient"></div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientMove 15s ease infinite;
          }
        `}
      </style>
    </div>
  );
}