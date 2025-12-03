
import React from 'react';
import { AIResponse } from '../types';
import { CareerCard } from './CareerCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { CheckSquare, Info, FileText, AlertTriangle } from 'lucide-react';

interface ResultsDashboardProps {
  data: AIResponse;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, onReset }) => {
  
  // Robust Salary Parser
  const parseSalary = (range: string) => {
    if (!range) return 0;
    const clean = range.toLowerCase().replace(/,/g, '');
    const isLPA = clean.includes('lpa') || clean.includes('lakh');
    const matches = clean.match(/(\d+(?:\.\d+)?)/g);
    
    if (!matches) return 0;
    
    const nums = matches.map(m => parseFloat(m));
    if (nums.length === 0) return 0;
    
    let avg = nums.length === 1 ? nums[0] : (nums[0] + nums[1]) / 2;

    if (isLPA) {
        avg = avg * 100000;
    } else if (clean.includes('k ') || clean.includes('k-') || clean.includes('k$')) {
        avg = avg * 1000;
    }

    return avg;
  };

  const chartData = data.careerPaths.map(career => {
    const avgSalary = parseSalary(career.salaryRange);
    let formatted = 'N/A';
    if (avgSalary > 0) {
        if (career.salaryRange.toLowerCase().includes('lpa')) {
            formatted = `${(avgSalary / 100000).toFixed(1)}L`;
        } else {
            formatted = `${(avgSalary / 1000).toFixed(0)}k`;
        }
    }

    return {
      name: career.roleTitle.split(' ').slice(0, 2).join(' '),
      fullName: career.roleTitle,
      salary: avgSalary || 10000,
      formattedSalary: formatted
    };
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 md:space-y-12 animate-fadeIn">
      {/* Header Summary */}
      <div className="bg-slate-800/40 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 bg-neon-yellow/5 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>
        <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 md:w-2 md:h-8 bg-neon-yellow rounded-full"></div>
                Profile Analysis
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg font-light max-w-4xl">{data.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Career Cards + Resume Feedback */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Resume Analysis Section */}
          <div className="bg-slate-800/30 backdrop-blur-md p-6 rounded-2xl border border-white/5">
             <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-neon-yellow" />
                Resume Improvements
             </h3>
             <ul className="space-y-3">
                {data.resumeFeedback && data.resumeFeedback.length > 0 ? (
                    data.resumeFeedback.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 bg-red-500/10 p-3 rounded-lg border border-red-500/10">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-300">{tip}</span>
                        </li>
                    ))
                ) : (
                    <li className="text-slate-500 text-sm italic">No specific resume data provided for analysis.</li>
                )}
             </ul>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                Top Recommendations
            </h3>
            <span className="text-[10px] md:text-xs font-mono text-neon-yellow bg-neon-yellow/10 px-2 py-1 md:px-3 md:py-1 rounded-full border border-neon-yellow/20 whitespace-nowrap">SORTED BY FIT</span>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {data.careerPaths.map((career, index) => (
                <CareerCard key={index} career={career} rank={index + 1} />
            ))}
          </div>
        </div>

        {/* Sidebar: Stats & Action Plan */}
        <div className="space-y-8">
            {/* Salary Chart */}
            <div className="bg-slate-800/40 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-white/10 shadow-lg">
                <h3 className="font-bold text-white mb-6 flex items-center gap-2 font-display text-sm md:text-base">
                    Estimated Salary Potential
                    <Info className="w-4 h-4 text-slate-500" />
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" tick={{fontSize: 10, fill: '#94a3b8'}} interval={0} axisLine={false} tickLine={false} dy={10} />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                contentStyle={{ borderRadius: '12px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}
                                itemStyle={{ color: '#ccf381' }}
                                formatter={(value: number, name: string, props: any) => [props.payload.formattedSalary, 'Avg Salary']}
                            />
                            <Bar dataKey="salary" fill="#ccf381" radius={[6, 6, 0, 0]} barSize={40}>
                                <LabelList dataKey="formattedSalary" position="top" fill="#fff" fontSize={12} fontWeight="bold" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-[10px] md:text-xs text-center text-slate-500 mt-4">Values are conservative averages based on current market conditions.</p>
            </div>

            {/* Action Plan */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-5 md:p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-yellow/10 rounded-full blur-[40px] pointer-events-none"></div>
                <h3 className="font-bold text-base md:text-lg mb-6 flex items-center gap-2 text-white font-display relative z-10">
                    <CheckSquare className="w-5 h-5 text-neon-yellow" />
                    Immediate Action Plan
                </h3>
                <ul className="space-y-4 md:space-y-5 relative z-10">
                    {data.finalActionPlan.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 md:gap-4 text-sm text-slate-300">
                            <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded bg-slate-700/50 flex items-center justify-center text-[10px] md:text-xs font-bold text-neon-yellow border border-white/5">
                                {index + 1}
                            </span>
                            <span className="leading-snug">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

             <button 
                onClick={onReset}
                className="w-full py-4 bg-slate-800/50 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white hover:text-slate-900 transition-all font-display tracking-wide text-sm md:text-base"
            >
                START NEW ANALYSIS
            </button>
        </div>
      </div>
    </div>
  );
};
