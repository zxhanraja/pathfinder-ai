import React from 'react';
import { PageLayout } from '../PageLayout';
import { Compass, Target, Zap, BookOpen } from 'lucide-react';

export const CareerGuide: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  return (
    <PageLayout title="Career Guide 2024" {...props}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        <section className="bg-slate-800/30 p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-6">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <Compass className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-4">Finding Your True North</h2>
                    <p className="text-slate-300 leading-relaxed">
                        The modern career is no longer a ladder; it's a lattice. To navigate it, you need to move beyond job titles and focus on <strong>skill clusters</strong>. Identify the intersection of what you're good at (Competence), what you enjoy (Passion), and what the market pays for (Economic Value).
                    </p>
                </div>
            </div>
        </section>

         <section className="bg-slate-800/30 p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-6">
                <div className="p-3 bg-neon-yellow/10 rounded-lg text-neon-yellow">
                    <Zap className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-4">The Skill-First Approach</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Employers are increasingly hiring for skills over degrees. To future-proof your career:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li><strong>Audit your current stack:</strong> What tools do you use daily?</li>
                        <li><strong>Identify adjacency:</strong> If you know Excel, SQL is a natural next step.</li>
                        <li><strong>Build proof of work:</strong> Don't just list a skill; link to a project that uses it.</li>
                    </ul>
                </div>
            </div>
        </section>

         <section className="bg-slate-800/30 p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-6">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                    <Target className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-4">Setting Strategic Goals</h2>
                    <p className="text-slate-300 leading-relaxed">
                        Set "outcome-based" goals rather than "output-based" ones. Instead of "Apply to 10 jobs," aim for "Secure 2 interviews." This shifts your focus to quality applications and networking rather than spamming resumes.
                    </p>
                </div>
            </div>
        </section>

      </div>
    </PageLayout>
  );
};