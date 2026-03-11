import { TrendingUp, TrendingDown, Database } from "lucide-react";
// image placeholders used since figma assets aren't supported
const imgClodsireSoup = '/images/Clodsire Soup Pot.png';
const imgDragonSweets = '/images/Assorted Dragon-Type Sweets.png';
const imgPikachuLatte = '/images/Pokemon Latte.png';
const imgEeveeCurry = '/images/Rice Plate Meal with Eevee.png';
const imgPaldeanBurger = '/images/Paldean Form Wooper Burger.png';
const imgEeveeCocoa = '/images/Cocoa.png';

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

export function RuleEvaluationMetrics() {
  const rules: FPRule[] = [
    {
      id: "rule1",
      antecedent: { name: "Paldean Wooper Burger", image: imgPaldeanBurger },
      consequent: { name: "Eevee's Cozy Cocoa", image: imgEeveeCocoa },
      support: "0.154",
      confidence: "0.872",
      lift: 2.34,
      leverage: 0.088,
      conviction: 4.21,
      trend: "up",
    },
    {
      id: "rule2",
      antecedent: { name: "Pikachu Latte", image: imgPikachuLatte },
      consequent: { name: "Clodsire Soup Pot", image: imgClodsireSoup },
      support: "0.121",
      confidence: "0.798",
      lift: 2.01,
      leverage: 0.061,
      conviction: 3.87,
      trend: "down",
    },
    {
      id: "rule3",
      antecedent: { name: "Eevee Curry", image: imgEeveeCurry },
      consequent: { name: "Dragon-Type Sweets", image: imgDragonSweets },
      support: "0.098",
      confidence: "0.754",
      lift: 1.89,
      leverage: 0.046,
      conviction: 3.12,
      trend: "down",
    },
    {
      id: "rule4",
      antecedent: { name: "Dragon-Type Sweets", image: imgDragonSweets },
      consequent: { name: "Pikachu Latte", image: imgPikachuLatte },
      support: "0.143",
      confidence: "0.823",
      lift: 2.15,
      leverage: 0.076,
      conviction: 3.95,
      trend: "up",
    },
    {
      id: "rule5",
      antecedent: { name: "Paldean Wooper Burger", image: imgPaldeanBurger },
      consequent: { name: "Dragon-Type Sweets", image: imgDragonSweets },
      support: "0.187",
      confidence: "0.915",
      lift: 2.67,
      leverage: 0.117,
      conviction: 5.03,
      trend: "up",
    },
  ];

  const TrendIcon = ({ trend }: { trend: "up" | "down" }) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-[var(--success-green)]" />
    ) : (
      <TrendingDown className="w-4 h-4 text-[var(--destructive)]" />
    );
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 h-full flex flex-col shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Database className="w-5 h-5 text-[var(--cafe-wood)]" />
        <h3 className="font-semibold text-[var(--foreground)]">FP-Growth Rule Evaluation</h3>
      </div>
      
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--card)] z-10">
            <tr className="border-b-2 border-[var(--border)]">
              <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">
                Rule (If X -&gt; Then Y)
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">
                Support
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">
                Confidence
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">
                Lift
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">
                Leverage
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--muted-foreground)]">
                Conviction
              </th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr
                key={rule.id}
                className="border-b border-[var(--border)] hover:bg-[var(--accent)] hover:bg-opacity-20 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#fcfaf8] p-1.5 rounded-lg border border-[var(--border)]">
                      <img src={rule.antecedent.image} alt={rule.antecedent.name} className="w-8 h-8 object-contain" />
                      <span className="font-medium text-sm text-[var(--foreground)] max-w-[120px] truncate" title={rule.antecedent.name}>
                        {rule.antecedent.name}
                      </span>
                    </div>
                    <span className="text-[var(--muted-foreground)] font-bold">→</span>
                    <div className="flex items-center gap-2 bg-[#fcfaf8] p-1.5 rounded-lg border border-[var(--border)]">
                      <img src={rule.consequent.image} alt={rule.consequent.name} className="w-8 h-8 object-contain" />
                      <span className="font-medium text-sm text-[var(--foreground)] max-w-[120px] truncate" title={rule.consequent.name}>
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
      
      <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          Showing 5 of 23 active rules
        </p>
        <button className="text-sm font-semibold text-[var(--cafe-wood)] hover:underline">
          View All Rules →
        </button>
      </div>
    </div>
  );
}
