import React, { useState } from 'react';
import { Compass, Github, Twitter, Linkedin, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleNav = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    if (!email || !email.includes('@')) return;

    // Simulate API call/Subscription
    setStatus('success');
    setEmail('');

    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  return (
    <footer className="relative z-10 bg-[#0a0f1c] border-t border-white/5 pt-16 pb-8 md:pt-20 md:pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid Layout: 1 col mobile, 2 cols tablet, 12 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 mb-16 md:mb-20">

          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-5 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2.5 rounded-xl border border-white/10">
                <Compass className="w-6 h-6 text-neon-yellow" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">PathFinder</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-base md:text-lg font-light">
              Navigate your professional future with precision. We use advanced AI to align your unique skills with high-growth career opportunities.
            </p>
            <div className="flex gap-4 pt-2">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800/50 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-neon-yellow hover:text-slate-900 hover:border-neon-yellow transition-all duration-300 group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold font-display text-lg mb-6 md:mb-8">Platform</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400">
              <li><a href="#" onClick={(e) => handleNav(e, 'about')} className="hover:text-neon-yellow transition-colors block py-1">About Us</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'how-it-works')} className="hover:text-neon-yellow transition-colors block py-1">Methodology</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'success-stories')} className="hover:text-neon-yellow transition-colors block py-1">Success Stories</a></li>
            </ul>
          </div>

          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold font-display text-lg mb-6 md:mb-8">Resources</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400">
              <li><a href="#" onClick={(e) => handleNav(e, 'blog')} className="hover:text-neon-yellow transition-colors block py-1">Blog</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'career-guide')} className="hover:text-neon-yellow transition-colors block py-1">Career Guide</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'salary-calculator')} className="hover:text-neon-yellow transition-colors block py-1">Salary Calculator</a></li>
              <li><a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="hover:text-neon-yellow transition-colors block py-1">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-white font-bold font-display text-lg mb-6 md:mb-8">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4">Get the latest career trends directly to your inbox.</p>
            <form onSubmit={handleSubscribe} className={`flex items-center bg-slate-800/50 border rounded-lg p-1 transition-colors duration-300 ${status === 'success' ? 'border-green-500/50' : 'border-white/10'}`}>
              <input
                type="email"
                placeholder={status === 'success' ? "Subscribed successfully!" : "Email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'success'}
                className="bg-transparent text-white px-4 py-2 flex-1 min-w-0 outline-none placeholder-slate-600 text-sm disabled:text-green-400 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'success'}
                className={`p-2 rounded-md transition-all duration-300 flex-shrink-0 cursor-pointer ${status === 'success' ? 'bg-green-500 text-white cursor-default' : 'bg-neon-yellow text-slate-900 hover:bg-white'}`}
              >
                {status === 'success' ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium text-center md:text-left">
          <p>© 2024 PathFinder. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" onClick={(e) => handleNav(e, 'privacy')} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => handleNav(e, 'terms')} className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};