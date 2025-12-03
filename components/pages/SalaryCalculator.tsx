import React, { useState } from 'react';
import { PageLayout } from '../PageLayout';
import { DollarSign, Calculator, Briefcase, MapPin, Clock, TrendingDown, AlertTriangle } from 'lucide-react';

export const SalaryCalculator: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  const [role, setRole] = useState('');
  const [exp, setExp] = useState('entry');
  const [location, setLocation] = useState('remote');
  const [result, setResult] = useState<number | null>(null);
  const [currency, setCurrency] = useState('$');

  const calculate = () => {
    const r = role.toLowerCase();
    let base = 0;
    let curr = '$';

    // === MARKET REALITY CHECK (Q4 2025) ===
    // Market is saturated. AI has lowered demand for generic roles.
    // Base salaries are corrected to post-2023 bubble burst levels.

    if (location === 'india') {
        curr = '₹';
        // India Reality: Mass recruiters offering 3.25-4.5 LPA. Startups ~4-6 LPA.
        // Non-tech entry level often starts at 2.4 - 3.0 LPA.
        base = 240000; // 2.4 LPA Base
    } else if (location === 'asia') {
        curr = '$';
        base = 12000; // ~$1k/month for general SE Asia entry
    } else if (location === 'eu' || location === 'uk') {
        curr = location === 'uk' ? '£' : '€';
        base = 28000; // Conservative EU/UK start due to economic stagnation
    } else {
        // US / Remote
        curr = '$';
        base = 42000; // Dropped from 60k+ to 42k for generic roles
    }

    // 2. Role Keyword Analysis (Multipliers adjusted for 2025 Saturation)
    
    // Tech (Saturated at entry level)
    if (r.includes('software') || r.includes('developer') || r.includes('engineer') || r.includes('coder')) {
        // India: 2.4L * 1.6 = ~3.84 LPA (Very realistic for freshers)
        // US: 42k * 1.4 = ~58k (Realistic for junior dev now)
        base *= location === 'india' ? 1.6 : 1.4; 
    }
    // Specialized AI/Data (Still valuable but cooling)
    else if (r.includes('data') || r.includes('scientist') || r.includes('ai') || r.includes('ml')) {
        base *= 1.9; // Higher premium
    }
    // Management (Experience required, entry level management is rare/low paid)
    else if (r.includes('manager') || r.includes('head') || r.includes('lead')) {
        base *= 1.5; 
    }
    // Creative/Design (AI impact high)
    else if (r.includes('design') || r.includes('ui') || r.includes('ux') || r.includes('writer') || r.includes('content')) {
        base *= 1.1; // Minimal markup over base
    }
    // Internships (Exploitative market reality)
    else if (r.includes('intern') || r.includes('trainee')) {
        base *= 0.4; // India: ~8k-10k/month. US: ~$15/hr
    }
    // Operations / Admin / Support
    else if (r.includes('support') || r.includes('admin') || r.includes('ops') || r.includes('hr') || r.includes('recruiter')) {
        base *= 0.9; // Often below median
    }

    // 3. Experience Multipliers (Flattened curve)
    // Companies are paying less for "Mid" level now than in 2021.
    if (exp === 'mid') base *= 1.4;      // 3-5 Years
    if (exp === 'senior') base *= 2.2;   // 5+ Years (Real money is here)
    if (exp === 'lead') base *= 3.2;     // 8+ Years

    // 4. Location Tiers
    if (location === 'sf' || location === 'ny') base *= 1.5; // US HCOL
    if (location === 'india') {
        // Bangalore/Gurgaon vs Tier 2/3
        // We assume average.
        // Random flux for market instability
        const variance = 0.9 + Math.random() * 0.2; 
        base *= variance;
    } else {
        const variance = 0.9 + Math.random() * 0.15;
        base *= variance;
    }

    // 5. Layoff & Saturation Adjustment (Global dampener)
    // Reduces everything by 5-10% to account for employer's market
    base *= 0.92; 

    // 6. Final Rounding
    let final = 0;
    if (location === 'india') {
        final = Math.round(base / 10000) * 10000;
    } else {
        final = Math.round(base / 500) * 500;
    }

    setCurrency(curr);
    setResult(final);
  };

  // Helper to format display
  const formatResult = (val: number) => {
    if (currency === '₹') {
        if (val >= 100000) {
            return (val / 100000).toFixed(2) + " LPA";
        }
        return val.toLocaleString('en-IN');
    }
    return val.toLocaleString();
  };

  return (
    <PageLayout title="Salary Calculator" {...props}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 border border-white/10 p-8 rounded-3xl shadow-2xl">
            
            {/* Market Warning */}
            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-xl p-4 mb-8 flex gap-3 items-start">
                <TrendingDown className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-yellow-500 font-bold text-sm mb-1">Market Correction Active (Q4 2025)</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                        Estimates have been adjusted downward to reflect current market saturation, AI impact, and 2025 hiring trends. Figures represent conservative base pay.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-10">
                {/* Role Input */}
                <div>
                    <label className="block text-xs font-bold text-neon-yellow uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> Target Role
                    </label>
                    <div className="relative group">
                        <input 
                            type="text" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            placeholder="Type role (e.g. Junior Java Dev, Content Intern)"
                            className="w-full bg-slate-900 border border-slate-700 p-4 pl-5 rounded-xl text-white outline-none focus:border-neon-yellow focus:ring-1 focus:ring-neon-yellow/50 placeholder-slate-600 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none group-focus-within:text-neon-yellow transition-colors">
                            <Briefcase className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Experience Level
                        </label>
                        <div className="relative">
                            <select value={exp} onChange={(e) => setExp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-neon-yellow appearance-none cursor-pointer">
                                <option value="entry">Fresher / 0-1y</option>
                                <option value="mid">Mid Level (2-5y)</option>
                                <option value="senior">Senior (5-8y)</option>
                                <option value="lead">Lead / Principal (8y+)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Market Region
                        </label>
                        <div className="relative">
                            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-neon-yellow appearance-none cursor-pointer">
                                <option value="india">India (Tier 1/2 Avg)</option>
                                <option value="asia">Southeast Asia</option>
                                <option value="us">United States</option>
                                <option value="eu">Europe (West)</option>
                                <option value="uk">United Kingdom</option>
                                <option value="remote">Global Remote</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={calculate}
                disabled={!role}
                className={`w-full font-bold font-display py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg ${role ? 'bg-neon-yellow text-slate-900 hover:bg-white hover:scale-[1.02]' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
            >
                <Calculator className="w-5 h-5" />
                Calculate Estimate
            </button>

            {result && (
                <div className="mt-10 p-8 bg-slate-900 rounded-2xl border border-white/10 text-center animate-fadeIn relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-yellow to-transparent opacity-50"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Estimated Annual Compensation</p>
                    <div className="text-4xl md:text-6xl font-display font-bold text-white flex items-center justify-center gap-2 mb-2">
                        <span className="text-green-400 text-3xl md:text-4xl">{currency}</span>
                        {formatResult(result)}
                    </div>
                     <div className="inline-block bg-slate-800/50 px-4 py-2 rounded-full border border-white/5 mt-2 flex items-center gap-2 justify-center mx-auto w-fit">
                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                        <p className="text-slate-500 text-[10px]">
                            Adjusted for high competition & 2025 market conditions.
                        </p>
                     </div>
                </div>
            )}
        </div>
      </div>
    </PageLayout>
  );
};