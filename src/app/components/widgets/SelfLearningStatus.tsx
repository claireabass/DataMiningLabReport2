import { AlertTriangle, Info, Bell, Activity } from "lucide-react";

export function SelfLearningStatus() {
  const notifications = [
    {
      id: 1,
      type: "info",
      icon: Info,
      title: "Model Retrained",
      desc: "Apriori model completed epoch 45. Accuracy improved by 2.1%.",
      time: "10 mins ago"
    },
    {
      id: 2,
      type: "activity",
      icon: Activity,
      title: "New Dataset Ingested",
      desc: "Dataset A: Daytime Orders (1,200 records) successfully parsed.",
      time: "32 mins ago"
    },
    {
      id: 3,
      type: "bell",
      icon: Bell,
      title: "Rule Generated",
      desc: "New high-lift rule found: [Pikachu Pancakes] -> [Sweet Berry].",
      time: "1 hr ago"
    }
  ];

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 h-full flex flex-col shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-5 h-5 text-[var(--cafe-wood)]" />
        <h3 className="font-semibold text-[var(--foreground)]">System Alerts & Logs</h3>
      </div>
      
      <div className="mb-6">
        <div className="bg-[#fff8e1] border-l-4 border-[var(--alert-orange)] rounded-r-lg p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--alert-orange)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-[var(--foreground)] mb-1">Pattern drift detected in 'Snorlax Tummy Filling Nap'</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Auto-lowering minimum support threshold to 0.03.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div key={notif.id} className="flex items-start gap-3 pb-4 border-b border-[var(--border)] last:border-0">
              <div className="p-2 rounded-full bg-[var(--muted)]">
                <Icon className="w-4 h-4 text-[var(--muted-foreground)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[var(--foreground)]">{notif.title}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">{notif.time}</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">{notif.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
