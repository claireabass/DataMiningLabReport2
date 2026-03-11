import { useState, useEffect } from "react";
import { Filter, Search, Download, TrendingUp, TrendingDown, Database, X } from "lucide-react";

interface FPRule {
  id: string;
  antecedent: { name: string; image: string };
  consequent: { name: string; image: string };
  support: string;
  confidence: string;
  lift: number;
  leverage: number;
  conviction: number;
  trend: "up" | "down";
}

interface RulesExplorerTabProps {
  dynamicRules?: FPRule[];
}

export function RulesExplorerTab({ dynamicRules }: RulesExplorerTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [minLift, setMinLift] = useState(0);
  const [minConfidence, setMinConfidence] = useState(0);
  const [fetchedRules, setFetchedRules] = useState<FPRule[]>([]);

  // Fetch all rules from backend whenever this tab mounts or dynamicRules change
  useEffect(() => {
    fetch('http://localhost:5000/api/rules')
      .then(res => res.json())
      .then(data => {
        if (data.rules && data.rules.length > 0) {
          setFetchedRules(data.rules);
        }
      })
      .catch(() => {});
  }, [dynamicRules]);

  const rules = fetchedRules.length > 0 ? fetchedRules : (dynamicRules || []);

  // Apply search and filter
  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      searchQuery === "" ||
      rule.antecedent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.consequent.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLift = rule.lift >= minLift;
    const matchesConfidence = parseFloat(rule.confidence) >= minConfidence;

    return matchesSearch && matchesLift && matchesConfidence;
  });

  const handleExport = () => {
    if (rules.length === 0) {
      alert("No rules to export. Please upload a dataset first.");
      return;
    }
    const headers = ["Antecedent", "Consequent", "Support", "Confidence", "Lift", "Leverage", "Conviction"];
    const csvRows = [headers.join(",")];
    filteredRules.forEach((rule) => {
      csvRows.push(
        [
          `"${rule.antecedent.name}"`,
          `"${rule.consequent.name}"`,
          rule.support,
          rule.confidence,
          rule.lift.toFixed(2),
          rule.leverage.toFixed(3),
          rule.conviction.toFixed(2),
        ].join(",")
      );
    });
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fp_growth_rules.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const TrendIcon = ({ trend }: { trend: "up" | "down" }) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-[var(--success-green)]" />
    ) : (
      <TrendingDown className="w-4 h-4 text-[var(--destructive)]" />
    );
  };

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[var(--input-background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--cafe-wood)]"
            />
          </div>
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
              showFilterPanel
                ? "bg-[var(--cafe-wood)] text-white border-[var(--cafe-wood)]"
                : "bg-[var(--background)] border-[var(--border)] hover:bg-[#f5e6d3]"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--cafe-wood)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {showFilterPanel && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm flex items-end gap-6 relative">
          <button
            onClick={() => setShowFilterPanel(false)}
            className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Min Lift</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={minLift}
              onChange={(e) => setMinLift(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[var(--input-background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--cafe-wood)]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Min Confidence</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={minConfidence}
              onChange={(e) => setMinConfidence(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[var(--input-background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--cafe-wood)]"
            />
          </div>
          <button
            onClick={() => { setMinLift(0); setMinConfidence(0); }}
            className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)] rounded-lg"
          >
            Reset
          </button>
        </div>
      )}

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-[var(--cafe-wood)]" />
          <h3 className="font-semibold text-[var(--foreground)]">FP-Growth Rule Evaluation</h3>
        </div>

        {filteredRules.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted-foreground)]">
            <p className="text-lg font-semibold mb-1">No rules found</p>
            <p className="text-sm">{rules.length === 0 ? "Upload a dataset to generate rules." : "Try adjusting your search or filter criteria."}</p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-[var(--card)] z-10">
                <tr className="border-b-2 border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">Rule (If X -&gt; Then Y)</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">Support</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">Confidence</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">Lift</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">Leverage</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">Conviction</th>
                </tr>
              </thead>
              <tbody>
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-[var(--border)] hover:bg-[var(--accent)] hover:bg-opacity-20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#fcfaf8] p-1.5 rounded-lg border border-[var(--border)]">
                          <img src={rule.antecedent.image} alt={rule.antecedent.name} className="w-8 h-8 object-contain" />
                          <span className="font-medium text-xs text-[var(--foreground)]" title={rule.antecedent.name}>
                            {rule.antecedent.name}
                          </span>
                        </div>
                        <span className="text-[var(--muted-foreground)] font-bold">→</span>
                        <div className="flex items-center gap-2 bg-[#fcfaf8] p-1.5 rounded-lg border border-[var(--border)]">
                          <img src={rule.consequent.image} alt={rule.consequent.name} className="w-8 h-8 object-contain" />
                          <span className="font-medium text-xs text-[var(--foreground)]" title={rule.consequent.name}>
                            {rule.consequent.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-sm text-[var(--foreground)]">{rule.support}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-sm text-[var(--foreground)]">{rule.confidence}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-medium text-sm text-[var(--foreground)]">{rule.lift.toFixed(2)}</span>
                        <TrendIcon trend={rule.trend} />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-sm text-[var(--foreground)]">{rule.leverage.toFixed(3)}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-medium text-sm text-[var(--foreground)]">{rule.conviction.toFixed(2)}</span>
                        <TrendIcon trend={rule.trend} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <p className="text-sm text-[var(--muted-foreground)]">
            Showing {filteredRules.length} of {rules.length} rules
          </p>
        </div>
      </div>
    </div>
  );
}