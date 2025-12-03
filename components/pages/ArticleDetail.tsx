import React, { useEffect } from 'react';
import { BlogPost } from '../data/blogPosts';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';

interface ArticleDetailProps {
    post: BlogPost;
    onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ post, onBack }) => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div className="animate-fadeIn">
            {/* Navigation Bar */}
            <div className="sticky top-20 z-30 py-4 mb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-neon-yellow transition-colors group font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Career Insights
                    </button>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                {/* Header Section */}
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-yellow/10 text-neon-yellow text-xs font-bold uppercase tracking-wider mb-6 border border-neon-yellow/20">
                        Career Insights
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-neon-yellow" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-neon-yellow" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-neon-yellow" />
                            <span>5 min read</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image (Placeholder with Gradient) */}
                {/* Featured Image (Placeholder with Gradient) */}
                <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl group">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${post.image || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Article Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* Introduction */}
                    <div className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12 border-l-4 border-neon-yellow pl-6">
                        {post.content.intro}
                    </div>

                    {/* Main Sections */}
                    <div className="space-y-12">
                        {post.content.sections.map((section, index) => (
                            <section key={index} className="group">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-neon-yellow transition-colors">
                                    {section.heading}
                                </h2>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {section.body}
                                </p>
                            </section>
                        ))}
                    </div>

                    {/* Conclusion */}
                    <div className="mt-16 p-8 bg-slate-800/30 border border-white/5 rounded-2xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon-yellow"></span>
                            Key Takeaway
                        </h3>
                        <p className="text-slate-300 italic">
                            {post.content.conclusion}
                        </p>
                    </div>
                </div>

                {/* Share / Footer of Article */}
                <div className="mt-20 pt-10 border-t border-white/10 flex justify-end items-center">
                    <button className="flex items-center gap-2 text-neon-yellow hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Share this article</span>
                    </button>
                </div>
            </article>
        </div>
    );
};
