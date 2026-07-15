import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { PostSkeleton, CreatePostSkeleton } from '../ui/Skeleton';
import { EmptyState, ErrorState } from '../ui/EmptyState';
import { Post } from '../../types';
import { cn } from '../../lib/utils';

interface CommunityFeedProps {
  className?: string;
}

const mapApiPostToReactPost = (apiPost: any): Post => {
  const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
  const currentUserImage = localStorage.getItem("profileImage");

  const authorName = apiPost.user_id?.name || apiPost.userName || "Gyan Prakash";
  let userAvatar = apiPost.userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Gyan";
  if (authorName === currentUser && currentUserImage) {
    userAvatar = currentUserImage;
  }

  return {
    id: apiPost._id || apiPost.id,
    userId: apiPost.user_id?._id || apiPost.user_id || "user1",
    userName: authorName,
    userRole: apiPost.user_id?.role || apiPost.userRole || "Student • Pragya Yog School",
    userAvatar: userAvatar,
    content: apiPost.content,
    image: apiPost.image,
    timestamp: apiPost.createdAt ? new Date(apiPost.createdAt).toLocaleDateString() : "Just now",
    likes: apiPost.likes || 0,
    isLiked: false,
    comments: (apiPost.comments || []).map((c: any) => {
      const cAuthor = c.user_id?.name || c.userName || "User";
      let cAvatar = c.userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
      if (cAuthor === currentUser && currentUserImage) {
        cAvatar = currentUserImage;
      }
      return {
        id: c._id || c.id,
        userId: c.user_id?._id || c.user_id || "user1",
        userName: cAuthor,
        userAvatar: cAvatar,
        content: c.comment_text || c.content || "",
        timestamp: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "Just now",
        likes: c.likes || 0,
        isLiked: false
      };
    }),
    shares: apiPost.shares || 0
  };
};

export function CommunityFeed({ className }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPosts = async () => {
    try {
      const AppService = (window as any).AppService;
      if (AppService) {
        const apiPosts = await AppService.getPosts();
        setPosts(apiPosts.map(mapApiPostToReactPost));
      } else {
        const local = localStorage.getItem("local_posts") || localStorage.getItem("cached_posts");
        const list = local ? JSON.parse(local) : [];
        setPosts(list.map(mapApiPostToReactPost));
      }
      setError(false);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    const sync = () => loadPosts();
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    window.addEventListener("postsUpdated", sync);
    return () => {
        window.removeEventListener("focus", sync);
        window.removeEventListener("storage", sync);
        window.removeEventListener("postsUpdated", sync);
    };
}, []);

  const handleCreatePost = async (content: string, image?: string) => {
    const AppService = (window as any).AppService;
    if (AppService) {
      await AppService.createPost(content, image);
    } else {
      let localPosts = JSON.parse(localStorage.getItem("local_posts") || "[]");
      const savedUserName = localStorage.getItem("userName") || "Gyan Prakash";
      const savedUserRole = localStorage.getItem("userRole") || "Student";
      const newPost = {
        _id: "post_" + Date.now(),
        user_id: { name: savedUserName, role: savedUserRole },
        content,
        image,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString()
      };
      localPosts.unshift(newPost);
      localStorage.setItem("local_posts", JSON.stringify(localPosts));
    }
    loadPosts();
  };

  const handleLike = async (postId: string) => {
    const AppService = (window as any).AppService;
    if (AppService) {
      await AppService.likePost(postId);
    } else {
      let localPosts = JSON.parse(localStorage.getItem("local_posts") || "[]");
      localPosts = localPosts.map((p: any) => {
        if (p._id === postId || p.id === postId) {
          return { ...p, likes: (p.likes || 0) + 1 };
        }
        return p;
      });
      localStorage.setItem("local_posts", JSON.stringify(localPosts));
    }
    loadPosts();
  };

  const handleComment = async (postId: string, content: string) => {
    const AppService = (window as any).AppService;
    if (AppService) {
      await AppService.addComment(postId, content);
    } else {
      let localPosts = JSON.parse(localStorage.getItem("local_posts") || "[]");
      const savedUserName = localStorage.getItem("userName") || "Gyan Prakash";
      const savedUserRole = localStorage.getItem("userRole") || "Student";
      const newComment = {
        _id: "cmt_" + Date.now(),
        user_id: { name: savedUserName, role: savedUserRole },
        comment_text: content,
        createdAt: new Date().toISOString()
      };
      localPosts = localPosts.map((p: any) => {
        if (p._id === postId || p.id === postId) {
          return { ...p, comments: [...(p.comments || []), newComment] };
        }
        return p;
      });
      localStorage.setItem("local_posts", JSON.stringify(localPosts));
    }
    loadPosts();
  };

  const handleCommentLike = (postId: string, commentId: string) => {
    // Local state toggle only
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

  const handleCommentEdit = async (postId: string, commentId: string, content: string) => {
    const AppService = (window as any).AppService;
    // Call edit endpoint if online and not a local comment
    if (AppService && !commentId.startsWith("cmt_")) {
      try {
        await fetch(`${AppService.API_BASE}/posts/comment/${commentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment_text: content })
        });
      } catch (e) {
        console.error(e);
      }
    }

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

  const handleCommentDelete = async (postId: string, commentId: string) => {
    const AppService = (window as any).AppService;
    if (AppService && !commentId.startsWith("cmt_")) {
      try {
        await fetch(`${AppService.API_BASE}/posts/comment/${commentId}`, {
          method: "DELETE"
        });
      } catch (e) {
        console.error(e);
      }
    }

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
    loadPosts();
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
