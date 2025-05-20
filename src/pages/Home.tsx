
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import useForumStore from '../store/ForumStore';

const Home = () => {
  const { categories } = useForumStore();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="scanlines"></div>
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-pixel text-primary neon-text mb-4 glitch" data-text="XENOTXT">XENOTXT</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            A retro-futuristic, text-based forum platform blending pixel-art aesthetics with modern UX.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-pixel text-secondary secondary-neon-text">CATEGORIES</h2>
          </div>
          
          <div className="space-y-4">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        
        <div className="border-t border-muted/30 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-muted/30 rounded-md p-4 pixel-corners">
              <h3 className="text-sm font-pixel text-accent accent-neon-text mb-3">LATEST ACTIVITY</h3>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  <span className="text-primary">@NEOCODER</span> posted in <Link to="/thread/thread1" className="text-secondary hover:underline">Quantum Computing</Link>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-primary">@PIXELMASTER</span> posted in <Link to="/thread/thread4" className="text-secondary hover:underline">Retro Gaming</Link>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-primary">@NEONVIEWER</span> posted in <Link to="/thread/thread6" className="text-secondary hover:underline">Cyberpunk Films</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-muted/30 rounded-md p-4 pixel-corners">
              <h3 className="text-sm font-pixel text-accent accent-neon-text mb-3">STATS</h3>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>Total Categories</span>
                  <span className="text-foreground font-pixel">{categories.length}</span>
                </div>
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>Total Threads</span>
                  <span className="text-foreground font-pixel">6</span>
                </div>
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>Total Posts</span>
                  <span className="text-foreground font-pixel">7</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-muted/30 rounded-md p-4 pixel-corners">
              <h3 className="text-sm font-pixel text-accent accent-neon-text mb-3">ABOUT</h3>
              <p className="text-xs text-muted-foreground">
                XENOTXT is a retro-inspired forum where past and future collide. Join the discussion on technology, gaming, cinema and more.
              </p>
              <div className="mt-4">
                <button className="bg-primary/20 hover:bg-primary/30 text-primary text-xs font-pixel px-3 py-1 rounded pixel-corners transition w-full">
                  JOIN XENOTXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
