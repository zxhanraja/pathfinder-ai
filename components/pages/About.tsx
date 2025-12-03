import React from 'react';
import { PageLayout } from '../PageLayout';
import { Target, Users, Lightbulb, TrendingUp, ShieldCheck, Globe, Compass, Cpu } from 'lucide-react';

export const About: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  return (
    <PageLayout title="About PathFinder AI" {...props}>
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center mb-10">
            <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl mb-6 relative group">
                <div className="absolute inset-0 bg-neon-yellow/20 blur-xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <Compass className="w-12 h-12 text-neon-yellow relative z-10" />
            </div>
            <div className="flex items-center gap-2 text-neon-yellow/80 font-mono text-xs tracking-widest uppercase border border-neon-yellow/20 px-3 py-1 rounded-full bg-neon-yellow/5">
                <Cpu className="w-3 h-3" />
                <span>System Architecture v2.5</span>
            </div>
        </div>

        {/* Mission Statement */}
        <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Architecting the Future of Work</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
                We believe that career confusion shouldn't exist in the age of information. 
                <strong className="text-neon-yellow"> PathFinder</strong> was born from a simple question: 
                <em> "What if you could have a personal career strategist that knew every job market trend in real-time?"</em>
            </p>
        </section>

        {/* The Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800/30 p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-red-400 text-2xl">✕</span> The Problem
                </h3>
                <p className="text-slate-400 mb-4">
                    Traditional career advice is often outdated, generic, or biased. Students graduate with skills the market doesn't need, and professionals feel stuck in roles that don't utilize their true potential.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                    <li>• Generic "follow your passion" advice</li>
                    <li>• Lack of data-driven salary insights</li>
                    <li>• No clear roadmap from Point A to Point B</li>
                </ul>
            </div>
             <div className="bg-slate-800/30 p-8 rounded-2xl border border-neon-yellow/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-yellow/10 blur-3xl rounded-full"></div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-neon-yellow text-2xl">✓</span> The Solution
                </h3>
                <p className="text-slate-300 mb-4">
                    PathFinder uses advanced Large Language Models (LLMs) to analyze your unique profile against millions of real-time data points. We don't just tell you "what" to be; we show you "how" to get there.
                </p>
                 <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center gap-2"><Target className="w-3 h-3 text-neon-yellow" /> Personalized Skill Gap Analysis</li>
                    <li className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-neon-yellow" /> Real-time Market Demand Data</li>
                    <li className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-neon-yellow" /> Bias-Free Recommendations</li>
                </ul>
            </div>
        </div>

        {/* Core Values */}
        <section>
            <h2 className="text-2xl font-display font-bold text-white mb-10 text-center">Why We Do It</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Users, title: "Democratizing Access", desc: "High-quality career coaching shouldn't be reserved for executives. We bring elite guidance to everyone." },
                    { icon: Lightbulb, title: "Clarity over Noise", desc: "We filter through the noise of the internet to give you actionable, specific steps." },
                    { icon: Globe, title: "Global Perspective", desc: "Work is global. Our data considers remote trends and international opportunities." }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors text-center">
                        <div className="w-12 h-12 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4 text-neon-yellow">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Team Section (Placeholder) */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-center border border-white/10">
            <h3 className="text-2xl font-display font-bold text-white mb-4">Built by Engineers & Career Strategists</h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                Our team consists of former FAANG engineers, data scientists, and HR veterans who were tired of seeing talent go to waste.
            </p>
            <button onClick={() => props.onNavigate('#contact')} className="text-neon-yellow font-bold hover:text-white transition-colors">
                Join our mission →
            </button>
        </div>

      </div>
    </PageLayout>
  );
};