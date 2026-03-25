import { SwapWidget } from "@flowx-finance/swap-widget";
import "@mysten/dapp-kit/dist/index.css";
import "@flowx-finance/swap-widget/index.esm.css";
import { useState, useCallback, useEffect, useRef } from "react";
import suidexLogo from "@assets/cropped_circle_image_1774412623919.png";

const config = {
  commission: {
    partner: '0x0b5fa8eabf48e68b8441b439f1fcb582602b6669a8cf8bbf86bddcd55a869add',
    valueType: 0,
    value: (0.5 / 100) * 1e6,
    strategy: 'OUTPUT',
    directTransfer: false,
  },
};

interface Bubble {
  id: number;
  logo: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch(
          "https://api-market.raidenx.io/api/v1/sui/pairs/trending?page=1&limit=100&resolution=24h&network=sui"
        );
        const data = await res.json();
        const logos = new Set<string>();
        for (const pair of data) {
          if (pair.tokenBase?.logoImageUrl) logos.add(pair.tokenBase.logoImageUrl);
          if (pair.tokenQuote?.logoImageUrl) logos.add(pair.tokenQuote.logoImageUrl);
        }
        const logoArr = Array.from(logos).slice(0, 60);
        const generated: Bubble[] = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          logo: logoArr[i % logoArr.length],
          x: Math.random() * 100,
          size: 36 + Math.random() * 36,
          duration: 14 + Math.random() * 20,
          delay: Math.random() * 18,
          opacity: 0.15 + Math.random() * 0.3,
        }));
        setBubbles(generated);
      } catch (e) {
        console.error("Failed to fetch logos", e);
      }
    };
    fetchLogos();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b) => (
        <img
          key={b.id}
          src={b.logo}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            bottom: "-80px",
            width: `${b.size}px`,
            height: `${b.size}px`,
            borderRadius: "50%",
            opacity: b.opacity,
            animation: `floatUp ${b.duration}s ${b.delay}s infinite linear`,
            objectFit: "cover",
            filter: "blur(0.3px)",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          5%   { opacity: var(--op, 0.25); }
          90%  { opacity: var(--op, 0.25); }
          100% { transform: translateY(-110vh) scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [widgetKey, setWidgetKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setWidgetKey((k) => k + 1);
      setRefreshing(false);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 relative">
      <BubbleBackground />

      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Header with custom logo */}
        <div className="flex items-center gap-3">
          <img src={suidexLogo} alt="Suidex Swap" className="w-10 h-10 rounded-full" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Suidex Swap</h1>
            <p className="text-gray-400 text-sm">Swap tokens on Sui</p>
          </div>
        </div>

        {/* Widget with logo override */}
        <div className="relative">
          <SwapWidget key={widgetKey} config={config} />
          {/* Overlay to replace FlowX logo with Suidex logo */}
          <div
            className="absolute pointer-events-none"
            style={{ top: "16px", left: "16px", width: "36px", height: "36px", zIndex: 50 }}
          >
            <img
              src={suidexLogo}
              alt="Suidex"
              className="w-full h-full rounded-full"
              style={{ background: "#0f172a" }}
            />
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={refreshing ? "animate-spin" : ""}
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          {refreshing ? "Refreshing..." : "Refresh balances"}
        </button>
      </div>
    </div>
  );
}
