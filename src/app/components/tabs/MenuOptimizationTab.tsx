import { BusinessInsights } from "../widgets/BusinessInsights";
import { MenuRecommendations } from "../widgets/MenuRecommendations";

interface Recommendation {
  id: string;
  type: "promo" | "placement";
  title: string;
  description: string;
  impact: string;
  image: string;
}

interface MenuOptimizationTabProps {
  dynamicRecommendations?: Recommendation[];
  dynamicRules?: any[];
  hasData?: boolean;
}

export function MenuOptimizationTab({ dynamicRecommendations, hasData }: MenuOptimizationTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">Menu Optimization</h2>
          <p className="text-sm text-[var(--muted-foreground)]">AI-driven actionable recommendations for your café menu</p>
        </div>
      </div>

      {/* Original 3 recommendation cards */}
      <MenuRecommendations dynamicRecommendations={dynamicRecommendations} />

      {/* Expanded Business Intelligence Insights */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">📊</span>
          <h3 className="font-semibold text-[var(--foreground)]">AI Business Insights</h3>
          <span className="ml-2 text-xs font-semibold bg-[#e3f2fd] text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
            7 Outputs
          </span>
        </div>
        <BusinessInsights hasData={hasData || false} />
      </div>
    </div>
  );
}