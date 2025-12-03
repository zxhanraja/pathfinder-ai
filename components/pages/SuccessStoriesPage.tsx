import React from 'react';
import { PageLayout } from '../PageLayout';
import { Quote, Star, TrendingUp } from 'lucide-react';

export const SuccessStoriesPage: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  const stories = [
    {
      name: "Sarah Jenkins",
      prevRole: "Graphic Designer",
      currRole: "UX Researcher",
      salaryIncrease: "+45%",
      quote: "PathFinder didn't just suggest a job; it gave me a complete roadmap. The project recommendations were spot on and helped me build a portfolio that got me hired in 3 months."
    },
    {
      name: "David Chen",
      prevRole: "Marketing Associate",
      currRole: "Data Analyst",
      salaryIncrease: "+60%",
      quote: "I was stuck in a marketing role I hated. The AI analyzed my hidden skills in Excel and suggested Data Analytics. I never realized how transferable my skills were until now."
    },
    {
      name: "Elena Rodriguez",
      prevRole: "CS Student",
      currRole: "Frontend Developer",
      salaryIncrease: "First Job",
      quote: "As a student, I was overwhelmed by choices. This tool broke down exactly what frameworks to learn first. The 'Future Scope' insight gave me confidence in my choice."
    },
    {
        name: "Michael Chang",
        prevRole: "Sales Rep",
        currRole: "Customer Success Manager",
        salaryIncrease: "+30%",
        quote: "I wanted to leave sales but stay in tech. PathFinder identified that my communication skills were perfect for CSM roles. The transition was seamless."
    },
    {
        name: "Priya Patel",
        prevRole: "Accountant",
        currRole: "FinTech Product Owner",
        salaryIncrease: "+80%",
        quote: "The domain knowledge I had was valuable, but I needed the tech vocabulary. The suggested courses bridged that gap perfectly."
    }
  ];

  return (
    <PageLayout title="Success Stories" {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, i) => (
            <div key={i} className="bg-slate-800/30 backdrop-blur border border-white/5 p-8 rounded-2xl flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, x) => (
                             <Star key={x} className="w-4 h-4 fill-neon-yellow text-neon-yellow" />
                        ))}
                    </div>
                    <div className="bg-green-900/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {story.salaryIncrease}
                    </div>
                </div>
                
                <p className="text-slate-300 mb-6 italic flex-grow">"{story.quote}"</p>
                
                <div className="border-t border-white/5 pt-6">
                    <h4 className="font-bold text-white font-display text-lg">{story.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <span>{story.prevRole}</span>
                        <span className="text-neon-yellow">→</span>
                        <span className="text-white">{story.currRole}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </PageLayout>
  );
};