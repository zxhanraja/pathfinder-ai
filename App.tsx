import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, AIResponse } from './types';
import { InputForm } from './components/InputForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { InitialLoader } from './components/InitialLoader';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { HowItWorks } from './components/pages/HowItWorks';
import { About } from './components/pages/About';
import { SuccessStoriesPage } from './components/pages/SuccessStoriesPage';
import { Blog } from './components/pages/Blog';
import { CareerGuide } from './components/pages/CareerGuide';
import { SalaryCalculator } from './components/pages/SalaryCalculator';
import { PrivacyPolicy, TermsOfService } from './components/pages/Legal';
import { generateCareerAdvice } from './services/geminiService';
import { Compass, Zap, Menu, ChevronDown, Code, Database, Palette, Briefcase, X, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [view, setView] = useState<string>('home');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [advice, setAdvice] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setLoading(true);
    setError(null);

    // Scroll to top to show loader
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const result = await generateCareerAdvice(userProfile);
      setAdvice(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze profile. Please check your API key or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProfile(null);
    setAdvice(null);
    setError(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    setMobileMenuOpen(false);
    if (view !== 'home') {
        setView('home');
        setTimeout(() => {
             const el = document.getElementById('form-section');
             el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateTo = (page: string) => {
    setMobileMenuOpen(false);
    if (page === '#contact') {
        if (view !== 'home') {
            setView('home');
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        setView(page);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Show Initial Loader before site content
  if (!initialLoadComplete) {
    return <InitialLoader onComplete={() => setInitialLoadComplete(true)} />;
  }

  // Router logic
  if (view === 'about') return <About onBack={() => setView('home')} onNavigate={navigateTo} />;
  if (view === 'how-it-works') return <HowItWorks onBack={() => setView('home')} onNavigate={navigateTo} />;
  if (view === 'success-stories') return <SuccessStoriesPage onBack={() => setView('home')} onNavigate={navigateTo} />;
  if (view === 'blog') return <Blog onBack={() => setView('home')} onNavigate={navigateTo} />;
  if (view === 'career-guide') return <CareerGuide onBack={() => setView('home')} onNavigate={navigateTo} />;
  if (view === 'salary-calculator') return <SalaryCalculator onBack={() => setView('home')} onNavigate={navigateTo} />;
  if (view === 'privacy') return <PrivacyPolicy onBack={() => setView('home')} onNavigate={navigateTo} />;
  if (view === 'terms') return <TermsOfService onBack={() => setView('home')} onNavigate={navigateTo} />;

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-neon-yellow selection:text-slate-900 flex flex-col bg-[#0f172a] animate-fadeIn">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Header (Logo + CTA) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleReset}>
            <div className="bg-slate-800/80 backdrop-blur-md p-2 rounded-lg border border-white/10 group-hover:border-neon-yellow/50 transition-colors shadow-lg">
              <Compass className="w-5 h-5 text-neon-yellow" />
            </div>
            <span className="text-lg font-display font-bold text-white tracking-tight">
              PathFinder
            </span>
          </div>
          
          {/* Right CTA */}
          <div className="flex items-center gap-4">
              <button 
              onClick={advice ? handleReset : scrollToForm}
              className="hidden md:block bg-neon-yellow text-slate-900 px-5 py-2 font-bold text-xs hover:bg-[#d9ff8c] hover:scale-105 transition-all shadow-[0_0_15px_rgba(204,243,129,0.2)] clip-button tracking-wide"
              >
              {advice ? 'NEW ANALYSIS' : 'GET STARTED'}
              </button>
              
              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 bg-slate-800/50 border border-white/10 rounded-lg text-white hover:bg-slate-700 transition-colors"
              >
                  <Menu className="w-6 h-6" />
              </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-xl flex flex-col animate-fadeIn">
           <div className="flex justify-end p-6">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-slate-800 rounded-full text-white hover:text-neon-yellow border border-white/10"
              >
                 <X className="w-6 h-6" />
              </button>
           </div>
           
           <div className="flex-grow flex flex-col items-center justify-center gap-8 p-6">
              {['About', 'Methodology', 'Reviews'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => { 
                        if(item === 'About') navigateTo('about');
                        else if(item === 'Methodology') navigateTo('how-it-works');
                        else if(item === 'Reviews') navigateTo('success-stories');
                    }}
                    className="text-3xl font-display font-bold text-white hover:text-neon-yellow transition-colors flex items-center gap-3"
                  >
                     {item}
                     <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </button>
              ))}
              <div className="w-16 h-px bg-white/10 my-4"></div>
              <button 
                onClick={scrollToForm}
                className="bg-neon-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(204,243,129,0.3)]"
              >
                Start Analysis
              </button>
           </div>

           <div className="p-8 text-center text-slate-500 text-sm">
              <p>© 2024 PathFinder</p>
           </div>
        </div>
      )}

      {/* Right Side Vertical Navigation (Floating Middle) - Hidden on mobile/tablet (xl+) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6">
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 py-8 px-3 rounded-full flex flex-col gap-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             {/* Updated Link Logic */}
             {['About', 'Methodology', 'Reviews'].map((item) => (
                <a key={item} href="#" onClick={(e) => { 
                    e.preventDefault(); 
                    if(item === 'About') navigateTo('about');
                    else if(item === 'Methodology') navigateTo('how-it-works');
                    else if(item === 'Reviews') navigateTo('success-stories');
                }} className="group relative flex items-center justify-center w-6">
                   <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-display font-bold text-slate-500 group-hover:text-neon-yellow transition-all tracking-[0.2em] uppercase whitespace-nowrap">
                      {item}
                   </span>
                   {/* Hover Indicator */}
                   <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-neon-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </a>
             ))}
          </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 bg-red-900/80 border border-red-500/50 text-red-200 rounded-2xl flex items-center gap-2 backdrop-blur-md animate-slideDown shadow-xl w-[90%] md:w-auto">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}

            {loading ? (
                <div className="pt-10">
                  <LoadingScreen />
                </div>
            ) : !advice ? (
                 <div className="flex flex-col items-center justify-center">
                    
                    {/* === HERO SECTION === */}
                    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center relative w-full pb-20 overflow-hidden perspective-1000">
                        
                        {/* Massive Central Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[500px] bg-neon-yellow/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>

                        {/* 3D Grid Floor */}
                        <div className="absolute bottom-[-30%] left-[-50%] w-[200%] h-[100%] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] opacity-30 [transform:rotateX(60deg)] pointer-events-none [mask-image:linear-gradient(to_top,black,transparent)] animate-grid-flow"></div>

                        {/* Floating Background Icons - 4 CORNERS ONLY */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                           
                           {/* Top Left: Tech */}
                           <div className="absolute top-[12%] left-[5%] lg:top-[15%] lg:left-[10%] animate-float-1 hidden lg:block">
                               <div className="bg-slate-800/50 backdrop-blur border border-white/10 p-3 xl:p-4 rounded-2xl flex items-center gap-3 text-slate-200 shadow-2xl">
                                   <div className="bg-neon-yellow/10 p-2 rounded-lg"><Code className="w-5 h-5 text-neon-yellow" /></div>
                                   <span className="text-sm font-mono font-bold">Tech</span>
                               </div>
                           </div>

                           {/* Top Right: Design */}
                           <div className="absolute top-[12%] right-[5%] lg:top-[15%] lg:right-[10%] animate-float-3 hidden lg:block">
                               <div className="bg-slate-800/50 backdrop-blur border border-white/10 p-3 xl:p-4 rounded-2xl flex items-center gap-3 text-slate-200 shadow-2xl">
                                   <div className="bg-pink-500/10 p-2 rounded-lg"><Palette className="w-5 h-5 text-pink-400" /></div>
                                   <span className="text-sm font-mono font-bold">Design</span>
                               </div>
                           </div>

                           {/* Bottom Left: Data */}
                           <div className="absolute bottom-[15%] left-[5%] lg:bottom-[20%] lg:left-[10%] animate-float-2 hidden lg:block">
                               <div className="bg-slate-800/50 backdrop-blur border border-white/10 p-3 xl:p-4 rounded-2xl flex items-center gap-3 text-slate-200 shadow-2xl">
                                   <div className="bg-purple-500/10 p-2 rounded-lg"><Database className="w-5 h-5 text-purple-400" /></div>
                                   <span className="text-sm font-mono font-bold">Data</span>
                               </div>
                           </div>

                           {/* Bottom Right: Business (Fourth Category) */}
                           <div className="absolute bottom-[15%] right-[5%] lg:bottom-[20%] lg:right-[10%] animate-float-1 hidden lg:block">
                               <div className="bg-slate-800/50 backdrop-blur border border-white/10 p-3 xl:p-4 rounded-2xl flex items-center gap-3 text-slate-200 shadow-2xl">
                                   <div className="bg-green-500/10 p-2 rounded-lg"><Briefcase className="w-5 h-5 text-green-400" /></div>
                                   <span className="text-sm font-mono font-bold">Business</span>
                               </div>
                           </div>

                        </div>

                        {/* Main Typography */}
                        <div className="flex flex-col items-center gap-0 mb-10 relative z-20 mt-10 md:mt-0">
                             <div className="flex items-center gap-3 md:gap-8 font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight drop-shadow-2xl">
                                <span>Future</span>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-neon-yellow/40 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <Zap className="w-10 h-10 sm:w-16 sm:h-16 md:w-28 md:h-28 text-neon-yellow animate-pulse drop-shadow-[0_0_30px_rgba(204,243,129,0.6)] rotate-12 relative z-10" fill="currentColor" />
                                </div>
                             </div>
                             <span className="font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight drop-shadow-2xl">Ready</span>
                        </div>
                        
                        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8 md:space-y-10 px-4 relative z-20">
                            {/* Divider Line */}
                            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-neon-yellow/50 to-transparent"></div>
                            
                            <p className="text-base md:text-xl text-slate-300 font-light leading-relaxed text-shadow-sm max-w-md md:max-w-none">
                                Don't just guess your future. Architect it. 
                                <br className="hidden md:block"/>
                                Discover career models with new growth options and <span className="text-neon-yellow font-medium border-b border-neon-yellow/30 pb-0.5">AI Precision</span>.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                                <button 
                                onClick={scrollToForm}
                                className="group bg-slate-900 hover:bg-neon-yellow hover:text-slate-900 text-white border border-white/20 hover:border-neon-yellow px-10 py-4 md:px-12 md:py-5 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(204,243,129,0.4)] w-full sm:w-auto"
                                >
                                    Start Analysis
                                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                </button>
                                
                                {/* Secondary Trust Indicator */}
                                <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5">
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center text-[9px] text-white font-bold">
                                                {i === 1 ? 'JD' : i === 2 ? 'AS' : 'MK'}
                                            </div>
                                        ))}
                                    </div>
                                    <span>10k+ users analyzed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Input Form Section - Below Fold */}
                    <div id="form-section" ref={formSectionRef} className="w-full py-20 scroll-mt-24 relative z-10">
                        <div className="flex flex-col items-center">
                           <div className="mb-12 text-center px-4">
                              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Initialize Profile</h2>
                           </div>
                           <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="w-screen mt-10">
                        <Testimonials />
                    </div>

                    {/* Contact Section */}
                    <ContactForm />
                 </div>
            ) : (
                <div className="pt-10">
                  <ResultsDashboard data={advice} onReset={handleReset} />
                </div>
            )}
        </div>
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;