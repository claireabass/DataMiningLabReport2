import { ChevronDown, RefreshCw, Layers, UploadCloud } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  hasDataset: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iteration: number;
  activeDataset: string;
  onDatasetChange: (dataset: string) => void;
  datasets: string[];
}

export function Header({ hasDataset, onUpload, iteration, activeDataset, onDatasetChange, datasets }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-[var(--card)] border-b border-[var(--border)] px-6 py-4 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Active Data:</span>
              <button
                onClick={() => hasDataset && setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-3 px-4 py-2 bg-[var(--background)] rounded-xl border border-[var(--border)] transition-all text-sm font-medium text-[var(--foreground)] ${hasDataset ? 'hover:border-[var(--cafe-wood)] hover:shadow-sm cursor-pointer' : 'opacity-70 cursor-not-allowed'}`}
              >
                <Layers className="w-4 h-4 text-[var(--cafe-wood)]" />
                <span>{hasDataset ? activeDataset : "No dataset selected"}</span>
                <ChevronDown className="w-4 h-4 text-[var(--muted-foreground)] ml-2" />
              </button>
            </div>
            
            {isDropdownOpen && hasDataset && (
              <div className="absolute top-full left-[100px] mt-2 w-64 bg-white border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-20">
                {datasets.map((dataset) => (
                  <button
                    key={dataset}
                    onClick={() => {
                      onDatasetChange(dataset);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 hover:bg-[var(--background)] transition-colors text-sm font-medium ${
                      dataset === activeDataset ? "bg-[#f5e6d3] text-[var(--cafe-wood)]" : "text-[var(--foreground)]"
                    }`}
                  >
                    {dataset}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-sm transition-colors ${hasDataset ? 'bg-[#fff8e1] border-[var(--pikachu-yellow)]' : 'bg-[var(--input-background)] border-[var(--border)]'}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${hasDataset ? 'bg-[var(--cafe-wood)] animate-pulse' : 'bg-[var(--muted-foreground)]'}`}></div>
            <span className={`text-sm font-bold tracking-wide ${hasDataset ? 'text-[var(--cafe-wood)]' : 'text-[var(--muted-foreground)]'}`}>
              {hasDataset ? `Current Learning Iteration: ${iteration}` : "ML Engine: Idle"}
            </span>
          </div>
          
          {!hasDataset ? (
            <label className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-[var(--cafe-wood)] text-white rounded-xl shadow-md hover:bg-opacity-90 transition-all font-semibold text-sm transform hover:scale-[1.02]">
              <UploadCloud className="w-4 h-4" />
              Upload CSV
              <input type="file" accept=".csv" className="hidden" onChange={onUpload} />
            </label>
          ) : (
            <label className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-[var(--cafe-wood)] text-white rounded-xl shadow-md hover:bg-opacity-90 transition-all font-semibold text-sm transform hover:scale-[1.02]">
              <RefreshCw className="w-4 h-4" />
              Ingest New Transactions
              <input type="file" accept=".csv" className="hidden" onChange={onUpload} />
            </label>
          )}
        </div>
      </div>
    </header>
  );
}
