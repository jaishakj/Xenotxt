
import React from 'react';
import { Post } from '../store/ForumStore';
import { ArrowUp, ArrowDown } from 'lucide-react';
import useForumStore from '../store/ForumStore';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { upvotePost, downvotePost } = useForumStore();
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    upvotePost(post.id);
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.preventDefault();
    downvotePost(post.id);
  };

  return (
    <div className={`w-full bg-card border ${post.isOriginalPost ? 'border-primary/30' : 'border-muted/30'} rounded-md p-4 mb-4 pixel-corners`}>
      <div className="flex">
        <div className="flex flex-col items-center mr-4">
          <button 
            onClick={handleUpvote}
            className="upvote-btn text-muted-foreground hover:text-primary focus:outline-none transition-colors duration-200"
          >
            <ArrowUp size={18} />
          </button>
          
          <span className="text-xs font-pixel my-1">{post.upvotes}</span>
          
          <button
            onClick={handleDownvote}
            className="downvote-btn text-muted-foreground hover:text-destructive focus:outline-none transition-colors duration-200"
          >
            <ArrowDown size={18} />
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className={`text-sm font-pixel ${post.isOriginalPost ? 'text-primary neon-text' : 'text-secondary secondary-neon-text'}`}>
              @{post.author}
            </span>
            <span className="text-xs text-muted-foreground ml-3">
              {formatDate(post.createdAt)}
            </span>
            {post.isOriginalPost && (
              <span className="ml-3 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-sm">
                OP
              </span>
            )}
          </div>
          
          <div className="text-sm text-foreground whitespace-pre-wrap">{post.content}</div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
