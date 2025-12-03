import React, { useState } from 'react';
import { CareerPath } from '../types';
import { ChevronDown, ChevronUp, DollarSign, TrendingUp, CheckCircle, XCircle, BookOpen, Search, Briefcase } from 'lucide-react';

interface CareerCardProps {
  career: CareerPath;
  rank: number;
}

export const CareerCard: React.FC<CareerCardProps> = ({ career, rank }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`group relative bg-slate-800/40 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden ${rank === 1 ? 'border-neon-yellow/50 shadow-[0_0_20px_rgba(204,243,129,0.1)]' : 'border-white/5 hover:border-white/20'}`}>
      
      {/* Accent Line for #1 */}
      {rank === 1 && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-yellow to-transparent"></div>}

      <div className="p-5 md:p-8 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3">
              <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-lg font-display font-bold ${rank === 1 ? 'bg-neon-yellow text-slate-900' : 'bg-slate-700 text-slate-300'}`}>
                {rank}
              </span>
              <h3 className="text-lg md:text-2xl font-display font-semibold text-white group-hover:text-neon-yellow transition-colors break-words leading-tight">
                {career.roleTitle}
              </h3>
              <span className="bg-neon-yellow/10 text-neon-yellow border border-neon-yellow/20 text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full font-mono font-medium whitespace-nowrap">
                {career.matchPercentage}% MATCH
              </span>
            </div>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl">{career.matchReason}</p>
          </div>
          <button className={`flex-shrink-0 p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all ${expanded ? 'bg-white/10' : ''}`}>
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="p-1.5 rounded bg-green-500/10 text-green-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span className="font-mono">{career.salaryRange}</span>
            </div>
             <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>{career.futureScope}</span>
            </div>
        </div>
      </div>

      {expanded && (
        <div className="bg-slate-900/50 border-t border-white/5 p-5 md:p-8 animate-fadeIn">
          {/* Skills Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div className="bg-slate-800/30 p-5 md:p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-white flex items-center gap-2 mb-4 font-display text-sm md:text-base">
                    <CheckCircle className="w-4 h-4 text-neon-yellow" /> Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                    {career.mustHaveSkills.map((skill, i) => (
                        <span key={i} className="px-2 md:px-3 py-1 md:py-1.5 bg-green-900/20 text-green-200 text-[10px] md:text-xs rounded-lg border border-green-500/20">{skill}</span>
                    ))}
                </div>
            </div>
            <div className="bg-slate-800/30 p-5 md:p-6 rounded-xl border border-white/5">
                 <h4 className="font-bold text-white flex items-center gap-2 mb-4 font-display text-sm md:text-base">
                    <XCircle className="w-4 h-4 text-red-400" /> Skills to Acquire
                </h4>
                <div className="flex flex-wrap gap-2">
                    {career.missingSkills.map((skill, i) => (
                        <span key={i} className="px-2 md:px-3 py-1 md:py-1.5 bg-red-900/20 text-red-200 text-[10px] md:text-xs rounded-lg border border-red-500/20">{skill}</span>
                    ))}
                </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="mb-8">
             <h4 className="font-bold text-white flex items-center gap-2 mb-6 font-display text-sm md:text-base">
                <BookOpen className="w-4 h-4 text-blue-400" /> Learning Roadmap
            </h4>
            <div className="space-y-0">
                {career.roadmap.map((phase, i) => (
                    <div key={i} className="relative pl-6 md:pl-8 border-l border-white/10 pb-8 last:pb-0 last:border-l-0 group/phase">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-slate-700 rounded-full border-2 border-slate-900 group-hover/phase:bg-neon-yellow group-hover/phase:scale-125 transition-all"></div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:bg-slate-800 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                <span className="font-bold text-neon-yellow text-sm md:text-base">{phase.phaseName}</span>
                                <span className="text-[10px] md:text-xs text-slate-500 font-mono bg-slate-900 px-2 py-1 rounded w-fit">{phase.duration}</span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-400">{phase.topics.join(", ")}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Projects & Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
             <div>
                <h4 className="font-bold text-white flex items-center gap-2 mb-4 font-display text-sm md:text-base">
                    <Briefcase className="w-4 h-4 text-purple-400" /> Suggested Projects
                </h4>
                <ul className="space-y-3">
                    {career.projects.map((proj, i) => (
                        <li key={i} className="text-sm bg-slate-800/30 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate-200 text-xs md:text-sm">{proj.title}</span>
                                <span className="text-[10px] uppercase tracking-wide bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">{proj.level}</span>
                            </div>
                            <p className="text-slate-500 text-xs">{proj.description}</p>
                        </li>
                    ))}
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-white flex items-center gap-2 mb-4 font-display text-sm md:text-base">
                    <Search className="w-4 h-4 text-orange-400" /> Job Search Keywords
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                    {career.searchKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] md:text-xs rounded border border-white/10 font-mono hover:text-white cursor-default">#{kw}</span>
                    ))}
                </div>
                 <h4 className="font-bold text-white flex items-center gap-2 mb-4 font-display text-sm md:text-base">
                    <BookOpen className="w-4 h-4 text-pink-400" /> Recommended Courses
                </h4>
                <ul className="space-y-2">
                    {career.recommendedCourses.map((course, i) => (
                        <li key={i} className="text-xs md:text-sm text-slate-400 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0"></div>
                            <span className="leading-tight">{course}</span>
                        </li>
                    ))}
                </ul>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};