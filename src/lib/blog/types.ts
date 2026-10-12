export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  readTimeMinutes: number;
  likesCount: number;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  commentsCount?: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}
