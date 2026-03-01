
import PremiumBackground from "./components/PremiumBackground";

const Connect = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
  <PremiumBackground />

      <h1 className="text-4xl font-bold mb-2">
        Nishar & Naushad
      </h1>

      <p className="text-purple-400 mb-6 font-medium">
        Founders – DesignOrbit
      </p>

      <p className="text-gray-400 mb-8 max-w-sm">
        We build high-performance, fully managed websites for restaurants,
        boutiques, and modern businesses.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">

        <a
          href="https://wa.me/918800610890"
          target="_blank"
          className="bg-purple-600 hover:bg-purple-700 transition-all py-3 rounded-xl font-semibold"
        >
          Chat on WhatsApp (Nishar)
        </a>

        <a
          href="https://wa.me/917217641653"
          target="_blank"
          className="bg-purple-600/80 hover:bg-purple-700 transition-all py-3 rounded-xl font-semibold"
        >
          Chat on WhatsApp (Naushad)
        </a>

        <a
          href="tel:+918800610890"
          className="border border-purple-500 hover:bg-purple-500/10 transition-all py-3 rounded-xl font-semibold"
        >
          Call 8800610890
        </a>

        <a
          href="/"
          className="border border-white/20 hover:bg-white/10 transition-all py-3 rounded-xl font-semibold"
        >
          View Portfolio
        </a>

      </div>

    </div>
  );
};

export default Connect;