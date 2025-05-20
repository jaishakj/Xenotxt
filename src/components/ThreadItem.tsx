
import React from 'react';
import { Link } from 'react-router-dom';
import { Thread } from '../store/ForumStore';
import { ArrowUp } from 'lucide-react';

interface ThreadItemProps {
  thread: Thread;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }) => {
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Link 
      to={`/thread/${thread.id}`}
      className="block w-full bg-card border border-muted/30 rounded-md p-4 mb-3 neon-hover transition-all duration-300 pixel-corners"
    >
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-4 pt-1">
          <ArrowUp 
            size={16}
            className="text-primary mb-1"
          />
          <span className="text-xs font-pixel">{thread.upvotes}</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-pixel text-foreground">{thread.title}</h3>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <span className="text-xs text-primary neon-text">@{thread.author}</span>
              <span className="text-xs text-muted-foreground ml-2">{formatDate(thread.createdAt)}</span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <span>{thread.replyCount}</span>
              <span className="ml-1">replies</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ThreadItem;
