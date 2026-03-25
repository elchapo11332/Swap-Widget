import { SwapWidget } from "@flowx-finance/swap-widget";
import "@mysten/dapp-kit/dist/index.css";
import "@flowx-finance/swap-widget/index.esm.css";
import { useState, useCallback } from "react";

const config = {
  commission: {
    partner: '0x0b5fa8eabf48e68b8441b439f1fcb582602b6669a8cf8bbf86bddcd55a869add',
    valueType: 0,
    value: (0.5 / 100) * 1e6,
    strategy: 'OUTPUT',
    directTransfer: false,
  },
};

function App() {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">FlowX Finance</h1>
          <p className="text-gray-400 text-sm mt-1">Swap tokens on Sui</p>
        </div>

        <SwapWidget key={widgetKey} config={config} />

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

export default App;
