export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  shares: number;
}

export interface CreatePostData {
  content: string;
  image?: File | string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
