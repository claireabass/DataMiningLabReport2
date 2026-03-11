import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { SelfLearningStatus } from "./components/widgets/SelfLearningStatus";
import { RuleEvaluationMetrics } from "./components/widgets/RuleEvaluationMetrics";
import { MenuRecommendations } from "./components/widgets/MenuRecommendations";
import { RulesExplorerTab } from "./components/tabs/RulesExplorerTab";
import { MenuOptimizationTab } from "./components/tabs/MenuOptimizationTab";
import { PipelineArchitectureTab } from "./components/tabs/PipelineArchitectureTab";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hasDataset, setHasDataset] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [activeDataset, setActiveDataset] = useState("No dataset selected");
  const [datasets, setDatasets] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const fileName = e.target.files[0].name;
      
      const nextLetter = String.fromCharCode(65 + datasets.length);
      const newDatasetName = `Dataset ${nextLetter}: ${fileName}`;
      
      // Simulate file processing and ML model generation
      setTimeout(() => {
        setIsUploading(false);
        setHasDataset(true);
        setIteration(prev => prev + 1);
        setDatasets(prev => [...prev, newDatasetName]);
        setActiveDataset(newDatasetName);
        
        // Reset the input so the same file can be uploaded again if needed
        e.target.value = '';
      }, 2000);
    }
  };

  const renderContent = () => {
    if (isUploading) {
      return (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-xl border border-[var(--border)]">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-[var(--border)]">
            <Loader2 className="w-10 h-10 text-[var(--cafe-wood)] animate-spin mb-4" />
            <p className="font-semibold text-[var(--cafe-wood)]">Re-training Models...</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">Processing new transaction data</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "rules":
        return <RulesExplorerTab />;
      case "optimization":
        return <MenuOptimizationTab />;
      case "pipeline":
        return <PipelineArchitectureTab />;
      case "overview":
      default:
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-1 h-[450px]">
                <SelfLearningStatus />
              </div>
              
              <div className="lg:col-span-2 h-[450px]">
                <RuleEvaluationMetrics />
              </div>
            </div>

            <div className="w-full">
              <MenuRecommendations />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          hasDataset={hasDataset} 
          onUpload={handleUpload} 
          iteration={iteration}
          activeDataset={activeDataset}
          onDatasetChange={setActiveDataset}
          datasets={datasets}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1600px] mx-auto h-full">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Market-Basket Analysis Dashboard</h2>
              <p className="text-[var(--muted-foreground)]">
                Real-time insights and ML-powered menu optimization for Pokémon Café
              </p>
            </div>
            
            {!hasDataset ? (
              <div className="mt-12 h-[500px] flex items-center justify-center bg-[var(--card)] border-2 border-dashed border-[var(--border)] rounded-xl transition-all">
                <div className="text-center max-w-md mx-auto">
                  <div className="w-20 h-20 bg-[#fff8e1] rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--pikachu-yellow)] shadow-sm">
                    {isUploading ? (
                      <Loader2 className="w-10 h-10 text-[var(--cafe-wood)] animate-spin" />
                    ) : (
                      <UploadCloud className="w-10 h-10 text-[var(--cafe-wood)]" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                    {isUploading ? "Ingesting Data..." : "No Dataset Available"}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-8">
                    {isUploading 
                      ? "Training Apriori/FP-Growth models on your uploaded transactions. This may take a moment."
                      : "Upload your transaction history CSV to initialize the Market-Basket Analysis engine and generate rules."}
                  </p>
                  
                  {!isUploading && (
                    <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-[var(--cafe-wood)] text-white rounded-xl shadow-md hover:bg-opacity-90 transition-all font-semibold">
                      <FileText className="w-5 h-5" />
                      <span>Select CSV File</span>
                      <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative">
                {renderContent()}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
