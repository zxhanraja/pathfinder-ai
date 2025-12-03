import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setResult(null);
    
    const formData = new FormData(event.currentTarget);
    // Web3Forms Access Key
    formData.append("access_key", "2220e4b9-8675-4619-a03c-7cbaf763acb6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! We'll get back to you soon.");
        (event.target as HTMLFormElement).reset();
      } else {
        setError(true);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(true);
      setResult("Connection error. Please check your internet.");
    } finally {
      setLoading(false);
      // Clear success message after 5 seconds
      if (!error) {
          setTimeout(() => setResult(null), 5000);
      }
    }
  };

  const inputClasses = "w-full px-4 py-4 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:border-neon-yellow focus:ring-1 focus:ring-neon-yellow/50 transition-all outline-none font-light";
  const labelClasses = "flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";

  return (
    <section id="contact" className="w-full py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute left-[-10%] top-[20%] w-[40%] h-[40%] bg-neon-yellow/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-10">
             <span className="text-neon-yellow font-mono text-sm uppercase tracking-widest mb-2 block">Get In Touch</span>
             <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Contact Support</h2>
             <p className="text-slate-400 mt-4 font-light text-lg">Have questions about your career path? Send us a message directly.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <User className="w-3 h-3 text-neon-yellow" /> Name
                </label>
                <input type="text" name="name" required placeholder="Your Name" className={inputClasses} />
              </div>
              <div>
                 <label className={labelClasses}>
                  <Mail className="w-3 h-3 text-neon-yellow" /> Email
                </label>
                <input type="email" name="email" required placeholder="your@email.com" className={inputClasses} />
              </div>
            </div>
            
            <div>
               <label className={labelClasses}>
                  <MessageSquare className="w-3 h-3 text-neon-yellow" /> Message
                </label>
              <textarea name="message" required rows={4} placeholder="How can we help you?" className={inputClasses}></textarea>
            </div>

            {/* Hidden subject field for email context */}
            <input type="hidden" name="subject" value="New Contact Message from PathFinder AI" />

            <div className="flex flex-col items-center pt-4">
               <button 
                type="submit" 
                disabled={loading}
                className="group bg-neon-yellow text-slate-900 font-bold font-display px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-[#d9ff8c] hover:scale-105 transition-all shadow-[0_0_20px_rgba(204,243,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {loading ? (
                      <>Processing...</>
                  ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                  )}
               </button>

               {result && (
                 <div className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-lg border animate-fadeIn ${error ? 'bg-red-900/20 border-red-500/20 text-red-200' : 'bg-green-900/20 border-green-500/20 text-green-200'}`}>
                    {error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    <span className="text-sm font-medium">{result}</span>
                 </div>
               )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};