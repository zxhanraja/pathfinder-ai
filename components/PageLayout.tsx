import React, { useEffect } from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { Footer } from './Footer';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children, onBack, onNavigate }) => {
  // Scroll to top when mounting a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Simple Header */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-400 hover:text-neon-yellow transition-colors duration-300 font-display font-bold uppercase tracking-widest text-xs"
        >
          <div className="p-2 rounded-full border border-white/10 bg-slate-800/50 group-hover:border-neon-yellow/50 transition-all duration-300 group-hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
        </button>

        <div className="flex items-center gap-2 opacity-50">
          <Compass className="w-5 h-5" />
          <span className="font-display font-bold">PathFinder</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative z-10 max-w-7xl mx-auto px-6 w-full py-12">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">{title}</h1>
          <div className="h-1 w-24 bg-neon-yellow rounded-full mx-auto md:mx-0 shadow-[0_0_15px_#ccf381]"></div>
        </div>

        <div className="animate-slideDown">
          {children}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};