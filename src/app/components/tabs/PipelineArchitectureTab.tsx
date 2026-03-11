import { Database, FileText, Activity, Layers, ArrowRight } from "lucide-react";

export function PipelineArchitectureTab() {
  const steps = [
    {
      id: "ingestion",
      icon: FileText,
      title: "Data Ingestion",
      desc: "Raw CSV transactions are uploaded and parsed into structured datasets.",
      status: "Active",
      color: "bg-[#fff8e1] border-[var(--pikachu-yellow)] text-[var(--cafe-wood)]"
    },
    {
      id: "preprocessing",
      icon: Database,
      title: "Preprocessing",
      desc: "Items are normalized, missing values handled, and rare items thresholded out.",
      status: "Automated",
      color: "bg-[#e6f4ea] border-[var(--success-green)] text-[var(--foreground)]"
    },
    {
      id: "modeling",
      icon: Activity,
      title: "FP-Growth & Apriori",
      desc: "Unsupervised learning generates frequent itemsets efficiently across iterations.",
      status: "Processing Engine",
      color: "bg-[#f5e6d3] border-[var(--eevee-brown)] text-[var(--foreground)]"
    },
    {
      id: "evaluation",
      icon: Layers,
      title: "Rule Evaluation",
      desc: "Metrics like Support, Confidence, Lift, and Conviction filter actionable rules.",
      status: "Live Feedback",
      color: "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)]"
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Machine Learning Pipeline</h2>
        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
          The underlying flow architecture powering the Pokémon Café Market-Basket Analysis system, from raw POS transactions to automated menu recommendations.
        </p>
      </div>
      
      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-1 bg-[var(--border)] -translate-x-1/2 rounded-full"></div>
        
        <div className="space-y-12 relative z-10">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className={`flex flex-col lg:flex-row items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 w-full`}>
                <div className={`lg:w-1/2 flex ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  <div className={`p-6 rounded-xl border-2 w-full max-w-sm shadow-sm ${step.color} transition-transform hover:-translate-y-1 bg-white bg-opacity-90 backdrop-blur-sm`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 px-2 py-1 bg-white bg-opacity-50 rounded-md">
                        {step.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm opacity-80 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--background)] border-4 border-[var(--border)] items-center justify-center shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-[var(--cafe-wood)]"></div>
                </div>
                
                <div className="lg:w-1/2 hidden lg:flex items-center justify-center opacity-30">
                  {/* Decorative faint arrows */}
                  {index < steps.length - 1 && (
                    <div className="rotate-90 lg:rotate-0">
                      <ArrowRight className={`w-12 h-12 text-[var(--muted-foreground)] ${isLeft ? '-ml-24' : 'ml-24'}`} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}