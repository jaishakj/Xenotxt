
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import ThreadItem from '../components/ThreadItem';
import CreateThreadModal from '../components/CreateThreadModal';
import useForumStore from '../store/ForumStore';
import { Plus } from 'lucide-react';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, threads, selectCategory } = useForumStore();
  
  // Find the current category
  const category = categories.find(cat => cat.id === categoryId);
  
  // Filter threads for this category
  const categoryThreads = threads.filter(thread => thread.categoryId === categoryId);
  
  // Update selected category in store
  useEffect(() => {
    if (categoryId) {
      selectCategory(categoryId);
    }
  }, [categoryId, selectCategory]);
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="scanlines"></div>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-pixel text-primary neon-text mb-4">CATEGORY NOT FOUND</h2>
            <Link to="/" className="text-secondary hover:underline text-sm">
              Return to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="scanlines"></div>
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="text-secondary hover:underline text-sm">&lt; Back to categories</Link>
          
          <div className="flex items-center mt-4">
            <div className="text-4xl mr-4">
              <span>{category.icon}</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-pixel text-primary neon-text">{category.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-pixel text-secondary secondary-neon-text">THREADS</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/80 text-xs font-pixel px-4 py-2 rounded flex items-center pixel-corners transition"
          >
            <Plus size={14} className="mr-1" />
            NEW THREAD
          </button>
        </div>
        
        <div className="space-y-4">
          {categoryThreads.length > 0 ? (
            categoryThreads.map(thread => (
              <ThreadItem key={thread.id} thread={thread} />
            ))
          ) : (
            <div className="bg-card border border-muted/30 rounded-md p-8 text-center pixel-corners">
              <p className="text-muted-foreground mb-4">No threads yet in this category.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/80 text-xs font-pixel px-4 py-2 rounded pixel-corners transition"
              >
                START THE FIRST THREAD
              </button>
            </div>
          )}
        </div>
      </main>
      
      <CreateThreadModal 
        categoryId={categoryId || ''}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Category;
