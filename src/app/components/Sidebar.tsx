import { Database, FileText, ListChecks, Lightbulb, Activity, Layers } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "rules", label: "Rules Explorer", icon: ListChecks },
    { id: "optimization", label: "Menu Optimization", icon: Lightbulb },
    { id: "pipeline", label: "Pipeline Architecture", icon: Layers },
  ];

  return (
    <aside className="w-64 bg-[#f5e6d3] border-r border-[#e0d5c7] h-screen flex flex-col shadow-sm z-20">
      <div className="p-6 border-b border-[#e0d5c7] bg-white bg-opacity-40">
        <h1 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
          <span>☕</span> Pokémon Café
        </h1>
        <p className="text-xs font-semibold text-[var(--muted-foreground)] mt-1 tracking-wider uppercase">MBA Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? "bg-[var(--cafe-wood)] text-white shadow-md"
                  : "text-[var(--foreground)] hover:bg-white hover:shadow-sm"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-5 border-t border-[#e0d5c7] bg-white bg-opacity-40">
        <div className="bg-[#fff8e1] rounded-xl p-4 border border-[var(--pikachu-yellow)] shadow-sm">
          <p className="text-xs text-[var(--foreground)]">
            <span className="font-bold flex items-center gap-1.5 text-[var(--cafe-wood)] mb-1">
              <span className="text-[var(--pikachu-yellow)]">⚡</span> Powered by ML
            </span>
            <span className="text-[var(--muted-foreground)]">Real-time association rules active.</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
