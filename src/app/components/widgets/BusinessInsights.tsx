import { useState, useEffect } from "react";
import { Package, TrendingUp, BarChart3, ShoppingCart, Repeat, Tag, MapPin, ChevronDown, ChevronUp, Star } from "lucide-react";

interface BusinessInsightsProps {
  hasData: boolean;
}

export function BusinessInsights({ hasData }: BusinessInsightsProps) {
  const [insights, setInsights] = useState<any>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("top_bundles");

  useEffect(() => {
    if (hasData) {
      fetch('http://localhost:5000/api/insights')
        .then(res => res.json())
        .then(data => {
          if (data.insights && Object.keys(data.insights).length > 0) {
            setInsights(data.insights);
          }
        })
        .catch(() => {});
    }
  }, [hasData]);

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  if (!insights) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-sm text-center">
        <p className="text-[var(--muted-foreground)]">Upload a dataset to generate business insights.</p>
      </div>
    );
  }

  const sections = [
    {
      key: "top_bundles",
      icon: Package,
      title: "Top Bundles (Frequent Itemsets)",
      subtitle: "Natural product bundles discovered from transaction patterns",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      content: () => (
        <div className="space-y-3">
          {insights.top_bundles?.map((b: any, i: number) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[var(--border)]">
              <img src={b.image} alt="" className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {b.items.map((item: string, j: number) => (
                    <span key={j} className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">{item}</span>
                  ))}
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">{b.explanation}</p>
                <span className="text-xs font-semibold text-amber-600 mt-1 inline-block">Support: {b.support_pct}</span>
              </div>
            </div>
          ))}
          {(!insights.top_bundles || insights.top_bundles.length === 0) && (
            <p className="text-xs text-[var(--muted-foreground)] text-center py-4">No multi-item bundles found at current support level.</p>
          )}
        </div>
      )
    },
    {
      key: "top_rules",
      icon: BarChart3,
      title: "Top Association Rules",
      subtitle: "Highest-lift rules with full metric breakdown",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      content: () => (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 px-2 font-semibold text-[var(--muted-foreground)]">Rule</th>
                <th className="text-right py-2 px-1 font-semibold text-[var(--muted-foreground)]">Sup</th>
                <th className="text-right py-2 px-1 font-semibold text-[var(--muted-foreground)]">Conf</th>
                <th className="text-right py-2 px-1 font-semibold text-[var(--muted-foreground)]">Lift</th>
                <th className="text-right py-2 px-1 font-semibold text-[var(--muted-foreground)]">Lev</th>
                <th className="text-right py-2 px-1 font-semibold text-[var(--muted-foreground)]">Conv</th>
              </tr>
            </thead>
            <tbody>
              {insights.top_rules?.map((r: any, i: number) => (
                <tr key={i} className="border-b border-[var(--border)]">
                  <td className="py-2 px-2">
                    <span className="font-medium">{r.antecedent.split(',')[0].trim()}</span>
                    <span className="text-[var(--muted-foreground)] mx-1">→</span>
                    <span className="font-medium">{r.consequent.split(',')[0].trim()}</span>
                  </td>
                  <td className="text-right py-2 px-1">{r.support}</td>
                  <td className="text-right py-2 px-1">{r.confidence}</td>
                  <td className="text-right py-2 px-1 font-semibold text-blue-600">{r.lift}</td>
                  <td className="text-right py-2 px-1">{r.leverage}</td>
                  <td className="text-right py-2 px-1">{r.conviction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    {
      key: "homepage_ranking",
      icon: Star,
      title: "Homepage Ranking Logic",
      subtitle: "E-commerce style: what users see first on the menu",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      content: () => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {insights.homepage_ranking?.map((item: any) => (
            <div key={item.rank} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[var(--border)] relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center shadow">{item.rank}</div>
              <img src={item.image} alt={item.item} className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--foreground)] truncate" title={item.item}>{item.item}</p>
                <p className="text-[10px] text-purple-500 font-medium">Score: {item.score}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: "frequently_bought_together",
      icon: ShoppingCart,
      title: "Frequently Bought Together",
      subtitle: "Amazon-style widget showing co-purchase patterns",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      content: () => (
        <div className="space-y-3">
          {insights.frequently_bought_together?.map((fbt: any, i: number) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-2">
                <img src={fbt.trigger_image} alt={fbt.trigger_item} className="w-12 h-12 object-contain" />
                <span className="text-xs font-medium max-w-[100px] truncate" title={fbt.trigger_item}>{fbt.trigger_item}</span>
              </div>
              <div className="text-2xl text-[var(--muted-foreground)] font-light">+</div>
              <div className="flex items-center gap-2">
                <img src={fbt.suggested_image} alt={fbt.suggested_item} className="w-12 h-12 object-contain" />
                <span className="text-xs font-medium max-w-[100px] truncate" title={fbt.suggested_item}>{fbt.suggested_item}</span>
              </div>
              <div className="ml-auto text-right">
                <span className="text-xs font-bold text-green-600 block">{fbt.confidence}</span>
                <span className="text-[10px] text-[var(--muted-foreground)]">{fbt.label}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: "cross_sell",
      icon: Repeat,
      title: "Cross-Sell Suggestions",
      subtitle: "When item X is added to cart, suggest these items",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      content: () => (
        <div className="space-y-4">
          {insights.cross_sell?.map((cs: any, i: number) => (
            <div key={i} className="p-3 bg-white rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <img src={cs.cart_image} alt={cs.cart_item} className="w-8 h-8 object-contain" />
                <span className="text-xs font-semibold">🛒 When "{cs.cart_item}" is in cart →</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {cs.suggestions.map((s: any, j: number) => (
                  <div key={j} className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-1.5 border border-orange-200">
                    <img src={s.image} alt={s.item} className="w-7 h-7 object-contain" />
                    <div>
                      <p className="text-[11px] font-medium truncate max-w-[120px]" title={s.item}>{s.item.split(',')[0].trim()}</p>
                      <p className="text-[10px] text-orange-600">Lift: {s.lift} · Conf: {s.confidence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: "promo_recommendations",
      icon: Tag,
      title: "Promo Recommendations",
      subtitle: "Auto-generated promotional strategies from rule patterns",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      content: () => (
        <div className="space-y-3">
          {insights.promo_recommendations?.map((p: any, i: number) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[var(--border)]">
              <img src={p.image} alt="" className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">{p.title}</span>
                  <span className="text-[10px] text-[var(--muted-foreground)]">Lift: {p.lift} · Conf: {p.confidence}</span>
                </div>
                <p className="text-xs text-[var(--foreground)]">{p.description}</p>
                <span className="text-xs font-semibold text-green-600 mt-1 inline-flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />{p.est_impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: "shelf_placement",
      icon: MapPin,
      title: "Shelf / Menu Placement",
      subtitle: "Strategic placement suggestions based on leverage analysis",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      content: () => (
        <div className="space-y-3">
          {insights.shelf_placement?.map((sp: any, i: number) => (
            <div key={i} className="p-3 bg-white rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-2">
                <img src={sp.ant_image} alt={sp.antecedent} className="w-8 h-8 object-contain" />
                <span className="text-xs font-bold text-[var(--muted-foreground)]">↔</span>
                <img src={sp.cons_image} alt={sp.consequent} className="w-8 h-8 object-contain" />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  sp.strength === 'Very Strong' ? 'bg-green-100 text-green-700 border border-green-300' :
                  sp.strength === 'Strong' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                  'bg-gray-100 text-gray-600 border border-gray-300'
                }`}>{sp.strength}</span>
                <span className="text-[10px] text-[var(--muted-foreground)] ml-auto">Leverage: {sp.leverage} · Lift: {sp.lift}</span>
              </div>
              <p className="text-xs text-[var(--foreground)]">{sp.suggestion}</p>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.key} className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection(section.key)}
            className="w-full flex items-center gap-3 p-4 hover:bg-[var(--accent)] hover:bg-opacity-30 transition-colors text-left"
          >
            <div className={`p-2 rounded-lg ${section.bgColor} ${section.borderColor} border`}>
              <section.icon className={`w-4 h-4 ${section.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-[var(--foreground)]">{section.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)]">{section.subtitle}</p>
            </div>
            {expandedSection === section.key
              ? <ChevronUp className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0" />
              : <ChevronDown className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0" />
            }
          </button>
          {expandedSection === section.key && (
            <div className="px-4 pb-4 border-t border-[var(--border)]">
              <div className="pt-3">
                {section.content()}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
