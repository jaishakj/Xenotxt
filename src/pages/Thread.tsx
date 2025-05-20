
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import PostItem from '../components/PostItem';
import ReplyForm from '../components/ReplyForm';
import useForumStore from '../store/ForumStore';
import { MessageSquare } from 'lucide-react';

const Thread = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const { threads, posts, categories, selectThread } = useForumStore();
  
  // Find the current thread
  const thread = threads.find(t => t.id === threadId);
  
  // Filter posts for this thread
  const threadPosts = posts.filter(post => post.threadId === threadId);
  
  // Find the category this thread belongs to
  const category = thread ? categories.find(cat => cat.id === thread.categoryId) : null;
  
  // Update selected thread in store
  useEffect(() => {
    if (threadId) {
      selectThread(threadId);
    }
  }, [threadId, selectThread]);
  
  if (!thread || !category) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="scanlines"></div>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-pixel text-primary neon-text mb-4">THREAD NOT FOUND</h2>
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
          <Link to={`/category/${category.id}`} className="text-secondary hover:underline text-sm">
            &lt; Back to {category.name}
          </Link>
          
          <h1 className="text-xl md:text-2xl font-pixel text-primary neon-text mt-4 mb-2">{thread.title}</h1>
          
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground">Started by</span>
            <span className="text-primary ml-2">@{thread.author}</span>
            <div className="flex items-center ml-4 text-muted-foreground">
              <MessageSquare size={14} className="mr-1" />
              <span>{thread.replyCount} replies</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {threadPosts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
        
        <ReplyForm threadId={threadId || ''} />
      </main>
    </div>
  );
};

export default Thread;
