
import { create } from 'zustand';

// Define mock data for the MVP
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  threadCount: number;
}

export interface Thread {
  id: string;
  categoryId: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  upvotes: number;
  replyCount: number;
}

export interface Post {
  id: string;
  threadId: string;
  author: string;
  content: string;
  createdAt: Date;
  upvotes: number;
  isOriginalPost: boolean;
}

interface ForumState {
  categories: Category[];
  threads: Thread[];
  posts: Post[];
  selectedCategoryId: string | null;
  selectedThreadId: string | null;
  
  // Actions
  selectCategory: (categoryId: string) => void;
  selectThread: (threadId: string) => void;
  createThread: (thread: Omit<Thread, 'id' | 'createdAt' | 'upvotes' | 'replyCount'>) => void;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'upvotes'>) => void;
  upvoteThread: (threadId: string) => void;
  downvoteThread: (threadId: string) => void;
  upvotePost: (postId: string) => void;
  downvotePost: (postId: string) => void;
}

// Create mock data
const mockCategories: Category[] = [
  { 
    id: 'cat1', 
    name: 'TECH', 
    description: 'Digital frontiers and silicon dreams', 
    icon: '💾', 
    threadCount: 42 
  },
  { 
    id: 'cat2', 
    name: 'GAMING', 
    description: 'Virtual worlds and pixel playgrounds', 
    icon: '🎮', 
    threadCount: 28 
  },
  { 
    id: 'cat3', 
    name: 'CINEMA', 
    description: 'Frames of reality and fiction', 
    icon: '🎬', 
    threadCount: 13 
  },
  { 
    id: 'cat4', 
    name: 'MUSIC', 
    description: 'Synth waves and digital beats', 
    icon: '🎧', 
    threadCount: 21 
  },
  { 
    id: 'cat5', 
    name: 'SCIENCE', 
    description: 'Quantum theories and cosmic queries', 
    icon: '🔬', 
    threadCount: 35 
  }
];

const mockThreads: Thread[] = [
  {
    id: 'thread1',
    categoryId: 'cat1',
    title: 'Quantum Computing: The Next Frontier?',
    author: 'NEOCODER',
    content: 'Has anyone been following the latest developments in quantum computing? The recent breakthrough at MIT seems to suggest...',
    createdAt: new Date('2023-05-15'),
    upvotes: 42,
    replyCount: 7
  },
  {
    id: 'thread2',
    categoryId: 'cat1',
    title: 'The Ethics of AI Development',
    author: 'SYNTHMIND',
    content: 'As we push the boundaries of artificial intelligence, what ethical frameworks should we establish?',
    createdAt: new Date('2023-05-16'),
    upvotes: 38,
    replyCount: 12
  },
  {
    id: 'thread3',
    categoryId: 'cat1',
    title: 'Open Source vs Proprietary Software',
    author: 'FREEBYTER',
    content: 'The battle continues. What are your thoughts on the current state of open source vs proprietary development?',
    createdAt: new Date('2023-05-17'),
    upvotes: 29,
    replyCount: 15
  },
  {
    id: 'thread4',
    categoryId: 'cat2',
    title: 'Retro Gaming Renaissance',
    author: 'PIXELMASTER',
    content: 'The resurgence of pixel art games has been incredible. What are your favorite modern retro-style games?',
    createdAt: new Date('2023-05-18'),
    upvotes: 56,
    replyCount: 23
  },
  {
    id: 'thread5',
    categoryId: 'cat2',
    title: 'Next-Gen Console Wars',
    author: 'CONSOLEHACKER',
    content: 'With the latest hardware releases, which ecosystem do you think has the edge?',
    createdAt: new Date('2023-05-19'),
    upvotes: 31,
    replyCount: 42
  },
  {
    id: 'thread6',
    categoryId: 'cat3',
    title: 'Cyberpunk Film Recommendations',
    author: 'NEONVIEWER',
    content: 'Beyond the obvious classics like Blade Runner, what are some lesser-known cyberpunk films worth watching?',
    createdAt: new Date('2023-05-20'),
    upvotes: 47,
    replyCount: 19
  }
];

const mockPosts: Post[] = [
  {
    id: 'post1',
    threadId: 'thread1',
    author: 'NEOCODER',
    content: 'Has anyone been following the latest developments in quantum computing? The recent breakthrough at MIT seems to suggest that we might be closer to practical quantum supremacy than previously thought. The implications for cryptography and computational science are mind-boggling.',
    createdAt: new Date('2023-05-15'),
    upvotes: 42,
    isOriginalPost: true
  },
  {
    id: 'post2',
    threadId: 'thread1',
    author: 'QUANTUMHACKER',
    content: 'Fascinating stuff! I\'ve been tracking this research team for years. Their approach using superconducting qubits seems promising, but I\'m skeptical about the error correction rates they\'re claiming.',
    createdAt: new Date('2023-05-15'),
    upvotes: 17,
    isOriginalPost: false
  },
  {
    id: 'post3',
    threadId: 'thread1',
    author: 'BYTECODER',
    content: 'The real question is when we\'ll see commercial applications beyond specialized research. I give it another decade before we see quantum computing impacting everyday encryption.',
    createdAt: new Date('2023-05-16'),
    upvotes: 8,
    isOriginalPost: false
  },
  {
    id: 'post4',
    threadId: 'thread1',
    author: 'SYNTHMIND',
    content: 'Anyone worried about quantum decryption breaking current security systems? We should be preparing transition plans for post-quantum cryptography NOW.',
    createdAt: new Date('2023-05-16'),
    upvotes: 29,
    isOriginalPost: false
  },
  {
    id: 'post5',
    threadId: 'thread4',
    author: 'PIXELMASTER',
    content: 'The resurgence of pixel art games has been incredible. What are your favorite modern retro-style games? I\'ve been obsessed with Hyper Light Drifter lately - the art direction is simply stunning.',
    createdAt: new Date('2023-05-18'),
    upvotes: 56,
    isOriginalPost: true
  },
  {
    id: 'post6',
    threadId: 'thread4',
    author: 'RETROGURU',
    content: 'Celeste has to be one of the best modern pixel art games. The precision platforming combined with the beautiful sprites and incredible soundtrack make it a masterpiece.',
    createdAt: new Date('2023-05-18'),
    upvotes: 41,
    isOriginalPost: false
  },
  {
    id: 'post7',
    threadId: 'thread4',
    author: 'ARCADEMAGE',
    content: 'Don\'t sleep on Katana ZERO! The neo-noir aesthetic with those neon colors against dark backgrounds is pixel perfection. Plus the time manipulation mechanics are super innovative.',
    createdAt: new Date('2023-05-19'),
    upvotes: 33,
    isOriginalPost: false
  }
];

// Create the store
const useForumStore = create<ForumState>((set) => ({
  categories: mockCategories,
  threads: mockThreads,
  posts: mockPosts,
  selectedCategoryId: null,
  selectedThreadId: null,
  
  selectCategory: (categoryId) => set({ selectedCategoryId: categoryId, selectedThreadId: null }),
  
  selectThread: (threadId) => set({ selectedThreadId: threadId }),
  
  createThread: (threadData) => set((state) => {
    const newThread: Thread = {
      id: `thread${state.threads.length + 1}`,
      ...threadData,
      createdAt: new Date(),
      upvotes: 0,
      replyCount: 0
    };
    
    const newPost: Post = {
      id: `post${state.posts.length + 1}`,
      threadId: newThread.id,
      author: threadData.author,
      content: threadData.content,
      createdAt: new Date(),
      upvotes: 0,
      isOriginalPost: true
    };
    
    return {
      threads: [...state.threads, newThread],
      posts: [...state.posts, newPost],
      selectedThreadId: newThread.id
    };
  }),
  
  createPost: (postData) => set((state) => {
    const newPost: Post = {
      id: `post${state.posts.length + 1}`,
      ...postData,
      createdAt: new Date(),
      upvotes: 0
    };
    
    // Update thread reply count
    const updatedThreads = state.threads.map(thread => 
      thread.id === postData.threadId 
        ? { ...thread, replyCount: thread.replyCount + 1 } 
        : thread
    );
    
    return {
      posts: [...state.posts, newPost],
      threads: updatedThreads
    };
  }),
  
  upvoteThread: (threadId) => set((state) => ({
    threads: state.threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, upvotes: thread.upvotes + 1 } 
        : thread
    )
  })),
  
  downvoteThread: (threadId) => set((state) => ({
    threads: state.threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, upvotes: Math.max(0, thread.upvotes - 1) } 
        : thread
    )
  })),
  
  upvotePost: (postId) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === postId 
        ? { ...post, upvotes: post.upvotes + 1 } 
        : post
    )
  })),
  
  downvotePost: (postId) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === postId 
        ? { ...post, upvotes: Math.max(0, post.upvotes - 1) } 
        : post
    )
  }))
}));

export default useForumStore;
