import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { PostSkeleton, CreatePostSkeleton } from '../ui/Skeleton';
import { EmptyState, ErrorState } from '../ui/EmptyState';
import { mockPosts } from '../../data/mockData';
import { Post, Comment } from '../../types';
import { cn } from '../../lib/utils';

interface CommunityFeedProps {
  className?: string;
}

export function CommunityFeed({ className }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCreatePost = (content: string, image?: string) => {
    const savedUserName = typeof window !== 'undefined' ? localStorage.getItem("userName") : null;
    const savedUserRole = typeof window !== 'undefined' ? localStorage.getItem("userRole") : null;
    const savedUserAvatar = typeof window !== 'undefined' ? localStorage.getItem("profileImage") : null;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: savedUserName || 'Gyan Prakash',
      userRole: savedUserRole || 'Student • Pragya Yog School',
      userAvatar: savedUserAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gyan',
      content,
      image,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      comments: [],
      shares: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string, content: string) => {
    const savedUserName = typeof window !== 'undefined' ? localStorage.getItem("userName") : null;
    const savedUserAvatar = typeof window !== 'undefined' ? localStorage.getItem("profileImage") : null;

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: savedUserName || 'Gyan Prakash',
      userAvatar: savedUserAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gyan',
      content,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const handleCommentLike = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                      isLiked: !comment.isLiked,
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const handleCommentEdit = (postId: string, commentId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, content } : comment
              ),
            }
          : post
      )
    );
  };

  const handleCommentDelete = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            }
          : post
      )
    );
  };

  const handleShare = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  };

  if (error) {
    return (
      <div className={cn('max-w-2xl mx-auto py-8 px-4', className)}>
        <ErrorState onRetry={handleRetry} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn('max-w-2xl mx-auto py-8 px-4', className)}>
        <CreatePostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={cn('max-w-2xl mx-auto py-8 px-4', className)}>
        <CreatePost onPost={handleCreatePost} />
        <EmptyState
          title="No posts yet"
          description="Be the first to share something with the community!"
        />
      </div>
    );
  }

  return (
    <div className={cn('max-w-2xl mx-auto py-8 px-4', className)}>
      <CreatePost onPost={handleCreatePost} />

      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onCommentLike={handleCommentLike}
              onCommentEdit={handleCommentEdit}
              onCommentDelete={handleCommentDelete}
              onShare={handleShare}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
