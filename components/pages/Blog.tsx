import React, { useState } from 'react';
import { PageLayout } from '../PageLayout';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { ArticleDetail } from './ArticleDetail';

export const Blog: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <PageLayout title="Career Insights" {...props}>
        <ArticleDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Career Insights" {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="group bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden hover:border-neon-yellow/50 transition-all flex flex-col h-full">
            <div className="h-48 w-full relative overflow-hidden shrink-0 group-hover:h-52 transition-all duration-300">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${post.image || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'})` }}></div>
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors"></div>
              <div className="absolute bottom-4 left-4 flex gap-4 text-xs text-white font-medium z-10">
                <span className="flex items-center gap-1 bg-slate-900/50 px-2 py-1 rounded-full backdrop-blur-sm"><Calendar className="w-3 h-3 text-neon-yellow" /> {post.date}</span>
                <span className="flex items-center gap-1 bg-slate-900/50 px-2 py-1 rounded-full backdrop-blur-sm"><User className="w-3 h-3 text-neon-yellow" /> {post.author}</span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-neon-yellow transition-colors">{post.title}</h3>
              <p className="text-slate-400 mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
              <button
                onClick={() => setSelectedPost(post)}
                className="flex items-center gap-2 text-neon-yellow font-bold text-sm hover:gap-3 transition-all mt-auto self-start"
              >
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
};