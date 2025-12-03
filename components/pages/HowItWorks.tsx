import React from 'react';
import { PageLayout } from '../PageLayout';
import { Database, Cpu, Map, Target } from 'lucide-react';

export const HowItWorks: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      desc: "We aggregate millions of job postings, salary data points, and skill requirements from global sources to build a real-time market graph."
    },
    {
      icon: Cpu,
      title: "AI Processing",
      desc: "Our Gemini-powered engine analyzes your unique profile against this graph, identifying patterns, transferable skills, and high-probability career pivots."
    },
    {
      icon: Map,
      title: "Gap Analysis",
      desc: "We pinpoint exactly what skills you are missing for your target roles and generate a learning path to bridge that gap efficiently."
    },
    {
      icon: Target,
      title: "Strategic Roadmap",
      desc: "You receive a personalized 3-6 month action plan, complete with project ideas and course recommendations to land the job."
    }
  ];

  return (
    <PageLayout title="How It Works" {...props}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xl text-slate-400 mb-16 leading-relaxed max-w-3xl">
          PathFinder combines advanced Large Language Models (LLMs) with real-time labor market analytics to de-risk your career decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-800 via-neon-yellow/20 to-slate-800 -z-10"></div>

            {steps.map((step, i) => (
                <div key={i} className="bg-slate-800/40 backdrop-blur border border-white/5 p-8 rounded-2xl hover:border-neon-yellow/30 transition-all group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                        <step.icon className="w-6 h-6 text-neon-yellow" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-3">0{i + 1}. {step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
            ))}
        </div>

        <div className="mt-20 p-8 bg-neon-yellow/5 border border-neon-yellow/10 rounded-2xl text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-4">Ready to see it in action?</h3>
            <button onClick={props.onBack} className="bg-neon-yellow text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                Start Your Analysis
            </button>
        </div>
      </div>
    </PageLayout>
  );
};