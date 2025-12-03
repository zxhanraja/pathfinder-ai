import React, { useEffect, useState } from 'react';
import { Compass, Cpu, Terminal } from 'lucide-react';

export const InitialLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);

  const bootLogs = [
    "INITIALIZING CORE KERNEL...",
    "LOADING NEURAL MODULES...",
    "ESTABLISHING SECURE HANDSHAKE...",
    "CALIBRATING AI PRECISION MODELS...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Delay before unmounting
          return 100;
        }
        // Random increment for "realistic" loading feel
        const increment = Math.random() * 8 + 2; 
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Switch logs based on progress
  useEffect(() => {
    if (progress < 20) setBootStep(0);
    else if (progress < 40) setBootStep(1);
    else if (progress < 60) setBootStep(2);
    else if (progress < 90) setBootStep(3);
    else setBootStep(4);
  }, [progress]);

  return (
    // Removed overflow-hidden to fix clipping issues on small screens
    <div className="fixed inset-0 z-[9999] bg-[#0a0f1c] flex flex-col items-center justify-center font-sans overflow-auto">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <div className="w-full max-w-md px-8 relative z-10 flex flex-col items-center py-10">
        
        {/* Pulse Ring */}
        <div className="relative mb-12">
            <div className="absolute inset-0 bg-neon-yellow/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-2xl relative z-10">
                <Compass className="w-16 h-16 text-neon-yellow animate-[spin_10s_linear_infinite]" />
            </div>
            {/* Orbiting Element */}
            <div className="absolute top-0 left-0 w-full h-full animate-spin">
                 <div className="w-2 h-2 bg-white rounded-full absolute -top-2 left-1/2 shadow-[0_0_15px_white]"></div>
            </div>
        </div>

        {/* Text Brand */}
        <h1 className="text-4xl font-display font-bold text-white tracking-[0.25em] mb-2 text-center">PATHFINDER</h1>
        <div className="flex items-center gap-2 text-neon-yellow/80 font-mono text-[10px] tracking-widest mb-12 bg-neon-yellow/5 px-3 py-1 rounded-full border border-neon-yellow/10">
            <Cpu className="w-3 h-3" />
            <span>AI ARCHITECT v2.5</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
            <div 
                className="h-full bg-neon-yellow shadow-[0_0_20px_#ccf381] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {/* Terminal Logs */}
        <div className="w-full flex justify-between items-end font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-3 h-3" />
                <span className="text-neon-yellow animate-pulse">{bootLogs[bootStep]}</span>
            </div>
            <div className="text-right">
                <span className="text-3xl font-bold text-white">{Math.floor(progress)}</span>
                <span className="text-neon-yellow ml-1">%</span>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-slate-600 text-[10px] font-mono tracking-[0.3em]">
        SECURE ENVIRONMENT DETECTED
      </div>
    </div>
  );
};