import { Check, X, Tag, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
// figma asset imports replaced with vanilla URLs for build compatibility
const imgPaldeanBurger = '/images/Paldean Form Wooper Burger.png';
const imgCocoa = '/images/Cocoa.png';
const imgLatte = '/images/Pokemon Latte.png';

interface Recommendation {
  id: string;
  type: "promo" | "placement";
  title: string;
  description: string;
  impact: string;
  image: string;
}

interface MenuRecommendationsProps {
  dynamicRecommendations?: Recommendation[];
}

import { useEffect } from "react";

export function MenuRecommendations({ dynamicRecommendations }: MenuRecommendationsProps) {
  const defaultRecommendations: Recommendation[] = [
    {
      id: "1",
      type: "promo",
      title: "Promo Generator",
      description: "High lift detected. Suggest 15% off Paldean Wooper Burger & Dragon-Type Sweets Combo.",
      impact: "Est. +18% revenue",
      image: imgPaldeanBurger,
    },
    {
      id: "2",
      type: "placement",
      title: "Menu Placement",
      description: "Move Eevee's Cozy Cocoa next to Paldean Wooper Burger on the Evening Menu.",
      impact: "Est. +12% cross-sell",
      image: imgCocoa,
    },
    {
      id: "3",
      type: "promo",
      title: "Combo Deal",
      description: "Create 'Dragon Voltage Combo': Dragon-Type Sweets + Pikachu Latte",
      impact: "Est. +15% margin",
      image: imgLatte,
    }
  ];

  const [recommendations, setRecommendations] = useState<Recommendation[]>(
    dynamicRecommendations && dynamicRecommendations.length > 0 ? dynamicRecommendations : defaultRecommendations
  );

  useEffect(() => {
    if (dynamicRecommendations && dynamicRecommendations.length > 0) {
      setRecommendations(dynamicRecommendations);
    }
  }, [dynamicRecommendations]);

  const handleApprove = (id: string) => {
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };

  const handleReject = (id: string) => {
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[var(--cafe-wood)]" />
        <h3 className="font-semibold text-[var(--foreground)]">AI Business Decisions</h3>
        <span className="ml-2 text-xs font-semibold bg-[#fff8e1] text-[var(--cafe-wood)] px-2.5 py-0.5 rounded-full border border-[var(--pikachu-yellow)]">
          {recommendations.length} Pending
        </span>
      </div>
      
      {recommendations.length === 0 ? (
        <div className="text-center py-12 bg-[var(--input-background)] rounded-xl border border-[var(--border)]">
          <div className="w-16 h-16 bg-[#e6f4ea] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--success-green)]">
            <Check className="w-8 h-8 text-[var(--success-green)]" />
          </div>
          <p className="font-semibold text-lg text-[var(--foreground)] mb-1">All caught up!</p>
          <p className="text-sm text-[var(--muted-foreground)]">
            No pending recommendations at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col p-5 bg-white rounded-xl border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <div className="h-40 mb-4 rounded-lg bg-[#fcfaf8] border border-[var(--border)] flex items-center justify-center relative overflow-hidden group">
                <img src={rec.image} alt={rec.title} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300" />
                <div className={`absolute top-3 left-3 p-2 rounded-lg shadow-sm backdrop-blur-md bg-white/90 ${
                  rec.type === "promo" 
                    ? "text-[var(--cafe-wood)] border border-[#e0d5c7]"
                    : "text-[var(--foreground)] border border-[#e0d5c7]"
                }`}>
                  {rec.type === "promo" ? <Tag className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-1">
                  {rec.title}
                </h4>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-2 min-h-[2.5rem]">
                  {rec.description}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <p className="text-sm font-medium text-[var(--success-green)] mb-4 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {rec.impact}
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(rec.id)}
                    className="flex-1 py-2 bg-[var(--cafe-wood)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(rec.id)}
                    className="py-2 px-3 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-lg hover:bg-[var(--border)] hover:text-[var(--foreground)] transition-colors flex items-center justify-center shadow-sm border border-[var(--border)]"
                    aria-label="Reject"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
