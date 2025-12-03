import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Transitioned to UX Design",
    content: "PathFinder didn't just suggest a job; it gave me a complete roadmap. The project recommendations were spot on and helped me build a portfolio that got me hired in 3 months.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Now a Data Analyst",
    content: "I was stuck in a marketing role I hated. The AI analyzed my hidden skills in Excel and suggested Data Analytics. I never realized how transferable my skills were until now.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Student -> Frontend Dev",
    content: "As a student, I was overwhelmed by choices. This tool broke down exactly what frameworks to learn first. The 'Future Scope' insight gave me confidence in my choice.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-20 border-t border-white/5 relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-900 via-transparent to-transparent z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Success <span className="text-neon-yellow">Stories</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl text-lg font-light">
                        See how professionals are finding their true calling using our AI models.
                    </p>
                </div>
                
                {/* Visual Stats */}
                <div className="flex items-center gap-8 border-l border-white/10 pl-8 hidden md:flex">
                    <div>
                        <span className="block text-3xl font-bold text-white font-display">10k+</span>
                        <span className="text-sm text-slate-500 uppercase tracking-wider">Careers Mapped</span>
                    </div>
                    <div>
                        <span className="block text-3xl font-bold text-white font-display">95%</span>
                        <span className="text-sm text-slate-500 uppercase tracking-wider">Placement Rate</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <div key={index} className="group relative bg-slate-800/30 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-slate-800/50 hover:border-neon-yellow/30 transition-all duration-300">
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-6 text-slate-700 group-hover:text-neon-yellow/20 transition-colors">
                            <Quote size={40} />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-neon-yellow text-neon-yellow" />
                            ))}
                        </div>

                        <p className="text-slate-300 leading-relaxed mb-8 relative z-10 min-h-[80px]">
                            "{review.content}"
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center font-bold text-white">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white font-display">{review.name}</h4>
                                <p className="text-xs text-neon-yellow uppercase tracking-wide">{review.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};