
import React, { useState } from 'react';
import useForumStore from '../store/ForumStore';

interface ReplyFormProps {
  threadId: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ threadId }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('ANON');
  const { createPost } = useForumStore();
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim() === '') return;
    
    createPost({
      threadId,
      author,
      content,
      isOriginalPost: false
    });
    
    // Reset form
    setContent('');
  };

  return (
    <div className="w-full bg-card border border-muted/30 rounded-md p-4 mt-6 pixel-corners">
      <h3 className="text-sm font-pixel text-primary mb-3">REPLY TO THREAD</h3>
      
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
        
        <div className="mb-2">
          <label className="block text-xs text-muted-foreground mb-1">YOUR REPLY</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full bg-muted border border-muted/50 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary/50 blink-cursor transition-colors duration-200"
            maxLength={maxLength}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
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
        
        <div className="text-right">
          <button
            type="submit"
            disabled={content.trim() === ''}
            className="bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50 text-xs font-pixel px-4 py-2 rounded pixel-corners transition"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
