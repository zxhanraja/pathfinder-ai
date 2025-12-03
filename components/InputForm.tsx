import React, { useState, useRef } from 'react';
import { UserProfile, ExperienceLevel } from '../types';
import { Briefcase, User, MapPin, Target, Sparkles, FileText, ArrowRight, Paperclip, X, Check } from 'lucide-react';

interface InputFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    currentRole: '',
    experienceLevel: ExperienceLevel.EntryLevel,
    skills: '',
    interests: '',
    careerGoals: '',
    location: '',
    resumeText: '',
    resumeFile: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB Limit
          alert("File is too large. Please upload a file smaller than 4MB.");
          return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Strip data URI prefix (e.g., "data:application/pdf;base64,")
        const base64Content = base64String.split(',')[1];
        
        setFormData(prev => ({
          ...prev,
          resumeFile: {
            name: file.name,
            type: file.type,
            data: base64Content
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, resumeFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-4 py-4 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:border-neon-yellow focus:ring-1 focus:ring-neon-yellow/50 transition-all outline-none font-light";
  const labelClasses = "flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";

  return (
    <div className="w-full max-w-5xl relative group px-4 md:px-0">
      {/* Decorative glow behind form */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      <div className="relative bg-slate-800/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden p-1">
        <div className="bg-slate-900/20 p-6 md:p-12 rounded-[1.8rem]">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-12 w-1 bg-neon-yellow rounded-full shadow-[0_0_15px_#ccf381]"></div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                Initialize Profile
              </h2>
              <p className="text-slate-400 text-sm md:text-base">Enter your details or upload your resume to generate a career matrix.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className={labelClasses}>
                  <User className="w-3 h-3 text-neon-yellow" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Johnson"
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <MapPin className="w-3 h-3 text-neon-yellow" /> Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. New York, Remote"
                  className={inputClasses}
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Professional Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className={labelClasses}>
                  <Briefcase className="w-3 h-3 text-neon-yellow" /> Current Role
                </label>
                <input
                  type="text"
                  name="currentRole"
                  required
                  placeholder="e.g. Student, Junior Dev"
                  className={inputClasses}
                  value={formData.currentRole}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <Target className="w-3 h-3 text-neon-yellow" /> Experience Level
                </label>
                <div className="relative">
                  <select
                    name="experienceLevel"
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    value={formData.experienceLevel}
                    onChange={handleChange}
                  >
                    {Object.values(ExperienceLevel).map((level) => (
                      <option key={level} value={level} className="bg-slate-900 text-slate-200">{level}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Dive Text Areas */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <label className={labelClasses}>
                  <Sparkles className="w-3 h-3 text-neon-yellow" /> Skills & Technologies
                </label>
                <textarea
                  name="skills"
                  required
                  rows={3}
                  placeholder="Python, React, Public Speaking, Excel..."
                  className={inputClasses}
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className={labelClasses}>
                    <Target className="w-3 h-3 text-neon-yellow" /> Interests
                  </label>
                  <textarea
                    name="interests"
                    rows={3}
                    placeholder="UI Design, Finance, Writing..."
                    className={inputClasses}
                    value={formData.interests}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <Target className="w-3 h-3 text-neon-yellow" /> Career Goals
                  </label>
                  <textarea
                    name="careerGoals"
                    rows={3}
                    placeholder="Tech Lead, High Salary..."
                    className={inputClasses}
                    value={formData.careerGoals}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className={labelClasses}>
                        <FileText className="w-3 h-3 text-neon-yellow" /> Resume / Bio
                    </label>
                    
                    {/* File Upload Button */}
                    <div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.txt,.doc,.docx"
                            className="hidden"
                        />
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-[10px] uppercase font-bold text-neon-yellow hover:text-white transition-colors bg-neon-yellow/10 hover:bg-neon-yellow/20 px-3 py-1.5 rounded-lg border border-neon-yellow/20"
                        >
                            <Paperclip className="w-3 h-3" />
                            {formData.resumeFile ? 'Change File' : 'Upload Resume'}
                        </button>
                    </div>
                </div>

                {/* File Preview Chip */}
                {formData.resumeFile && (
                    <div className="mb-3 flex items-center gap-2 bg-green-900/20 border border-green-500/20 text-green-300 px-4 py-3 rounded-xl animate-fadeIn">
                        <div className="bg-green-500/20 p-1 rounded-full"><Check className="w-3 h-3" /></div>
                        <span className="text-sm font-medium truncate flex-1">{formData.resumeFile.name}</span>
                        <button type="button" onClick={removeFile} className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <textarea
                  name="resumeText"
                  rows={4}
                  placeholder={formData.resumeFile ? "Additional context or cover letter details..." : "Paste resume content here for better accuracy, or upload a file above..."}
                  className={inputClasses}
                  value={formData.resumeText}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-display font-bold text-lg tracking-wide shadow-xl transition-all transform hover:-translate-y-1 w-full md:w-auto ${
                  isLoading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-neon-yellow text-slate-900 hover:shadow-[0_0_30px_rgba(204,243,129,0.4)]'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    GENERATE PATH
                    <div className="bg-slate-900/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};