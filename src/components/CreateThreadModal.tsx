
import React, { useState } from 'react';
import useForumStore from '../store/ForumStore';
import { X } from 'lucide-react';

interface CreateThreadModalProps {
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ categoryId, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('ANON');
  const { createThread } = useForumStore();
  const maxLength = 1000;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '' || content.trim() === '') return;
    
    createThread({
      categoryId,
      title,
      author,
      content
    });
    
    // Reset form and close modal
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="scanlines"></div>
      <div className="relative w-full max-w-2xl bg-card border border-primary pixel-corners animate-in fade-in zoom-in duration-300 crt">
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-primary focus:outline-none transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-pixel text-primary neon-text mb-6">NEW THREAD</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs text-muted-foreground mb-1">USERNAME</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-muted border border-muted/50 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors duration-200"
                maxLength={20}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-xs text-muted-foreground mb-1">TITLE</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-muted border border-muted/50 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors duration-200"
                maxLength={100}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-xs text-muted-foreground mb-1">CONTENT</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full bg-muted border border-muted/50 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary/50 blink-cursor transition-colors duration-200"
                maxLength={maxLength}
              />
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-xs text-muted-foreground">
                {content.length}/{maxLength} characters
              </div>
              <div className="w-32 h-2 bg-muted/50 rounded overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(content.length / maxLength) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-muted hover:bg-muted/80 text-xs font-pixel px-4 py-2 rounded pixel-corners transition"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={title.trim() === '' || content.trim() === ''}
                className="bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50 text-xs font-pixel px-4 py-2 rounded pixel-corners transition"
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateThreadModal;
