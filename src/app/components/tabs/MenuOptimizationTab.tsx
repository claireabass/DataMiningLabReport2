import { useState } from "react";
import { MenuRecommendations } from "../widgets/MenuRecommendations";
const imgGengar = '/images/Gengar\'s Confuse Ray Smoothie.png';
const imgCurry = '/images/Pikachu and Squirtle\'s Best Friends Forever Curry Plate.png';

export function MenuOptimizationTab() {
  const [autoApprove, setAutoApprove] = useState(false);
  const [priceOptimization, setPriceOptimization] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">Menu Optimization</h2>
          <p className="text-sm text-[var(--muted-foreground)]">AI-driven actionable recommendations for your café menu</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MenuRecommendations />
          
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Past Actions & Impact</h3>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl flex items-center justify-between gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#fcfaf8] border border-[var(--border)] flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={imgGengar} alt="Gengar Smoothie" className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Bundle: Gengar Smoothie + Pokeball</h4>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Approved 3 days ago</p>
                </div>
                <div className="text-right">
                  <span className="text-[var(--success-green)] font-semibold text-sm flex items-center justify-end gap-1">
                    +8% Sales
                  </span>
                  <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mt-1">vs previous week</p>
                </div>
              </div>
              
              <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl flex items-center justify-between gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#fcfaf8] border border-[var(--border)] flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={imgCurry} alt="Best Friends Curry" className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Placement: Best Friends Curry</h4>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Approved 1 week ago</p>
                </div>
                <div className="text-right">
                  <span className="text-[var(--success-green)] font-semibold text-sm flex items-center justify-end gap-1">
                    +12% Cross-sell
                  </span>
                  <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mt-1">vs previous week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Optimization Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-sm font-medium text-[var(--foreground)]">Auto-approve Combos</span>
                  <span className="text-xs text-[var(--muted-foreground)]">If confidence &gt; 90%</span>
                </div>
                <div 
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${autoApprove ? 'bg-[var(--success-green)]' : 'bg-[#e0d5c7]'}`}
                  onClick={() => setAutoApprove(!autoApprove)}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${autoApprove ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-sm font-medium text-[var(--foreground)]">Price Optimization</span>
                  <span className="text-xs text-[var(--muted-foreground)]">Dynamic discounting</span>
                </div>
                <div 
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${priceOptimization ? 'bg-[var(--success-green)]' : 'bg-[#e0d5c7]'}`}
                  onClick={() => setPriceOptimization(!priceOptimization)}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${priceOptimization ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}