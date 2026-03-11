import { RuleEvaluationMetrics } from "../widgets/RuleEvaluationMetrics";
import { Filter, Search, Download } from "lucide-react";

export function RulesExplorerTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">Rules Explorer</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Browse and filter all generated association rules</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="pl-9 pr-4 py-2 bg-[var(--input-background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--cafe-wood)]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[#f5e6d3] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--cafe-wood)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
      
      <div className="h-[700px]">
        <RuleEvaluationMetrics />
      </div>
    </div>
  );
}