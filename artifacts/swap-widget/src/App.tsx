import { SwapWidget } from "@flowx-finance/swap-widget";
import "@mysten/dapp-kit/dist/index.css";
import "@flowx-finance/swap-widget/index.esm.css";

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
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">FlowX Finance</h1>
          <p className="text-gray-400 text-sm mt-1">Swap tokens on Sui</p>
        </div>
        <SwapWidget config={config} />
      </div>
    </div>
  );
}

export default App;
