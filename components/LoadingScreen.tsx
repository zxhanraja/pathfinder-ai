import React, { useEffect, useState, useRef } from 'react';
import { Cpu, Terminal } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const logMessages = [
    "Initializing secure connection...",
    "Verifying user credentials...",
    "Parsing profile data vector...",
    "Connecting to Gemini Neural Engine...",
    "Scanning global job market (500ms)...",
    "Analyzing salary trends in target region...",
    "Identifying skill adjacencies...",
    "Calculating match probabilities...",
    "Generating personalized roadmap...",
    "Structuring final response..."
  ];

  useEffect(() => {
    // Progress Bar Logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return prev;
        // Slow down as it gets higher
        const increment = prev > 80 ? 0.5 : prev > 50 ? 1 : 2;
        return Math.min(prev + increment, 99);
      });
    }, 100);

    // Terminal Log Logic
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs(prev => [...prev, `> ${logMessages[logIndex]}`]);
        logIndex++;
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);



  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6 animate-fadeIn w-full max-w-3xl mx-auto">

      {/* Main Loader Card */}
      <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">

        {/* Header */}
        <div className="bg-slate-950 px-6 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-neon-yellow">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest">AI_CORE_PROCESSING</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col items-center flex-grow justify-center">

          {/* Percentage Display */}
          <div className="relative mb-10 w-32 h-32">
            {/* Added viewBox to prevent clipping */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              <circle
                className="text-slate-800"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
              <circle
                className="text-neon-yellow transition-all duration-300 ease-out"
                strokeWidth="4"
                strokeDasharray={365}
                strokeDashoffset={365 - (365 * progress) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <span className="text-3xl font-display font-bold text-white">{Math.floor(progress)}%</span>
            </div>
          </div>

          {/* Text Status */}
          <h2 className="text-2xl font-display font-bold text-white mb-2 animate-pulse text-center">Analyzing Profile</h2>
          <p className="text-slate-400 text-sm mb-8 text-center">Please wait while we architect your future.</p>

          {/* Terminal Output */}
          <div className="w-full bg-black/50 rounded-lg border border-white/5 p-4 font-mono text-xs text-green-400 h-32 overflow-y-auto shadow-inner scrollbar-thin scrollbar-thumb-slate-700">
            <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-white/5 pb-1">
              <Terminal className="w-3 h-3" />
              <span>System Log</span>
            </div>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="opacity-80">{log}</div>
              ))}
              <div ref={logsEndRef} />
              {progress < 100 && (
                <div className="animate-pulse">_</div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom loading strip */}
        <div className="h-1 w-full bg-slate-800 overflow-hidden shrink-0">
          <div className="h-full bg-neon-yellow animate-progressBar" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};