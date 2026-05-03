// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
  };
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

// User
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UpdateProfileDto {
  username?: string;
  email?: string;
  password?: string;
}

export interface ProfileFormProps {
  initialName: string;
  onSave: (name: string) => Promise<void>;
}

// Articles
export interface Author {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ArticleImage {
  id: number;
  file_name: string;
  storage_path: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  created_at: string;
  author: Author;
  categories?: Category[];
  images?: ArticleImage[];
}

export interface CreateArticleDto {
  title: string;
  content: string;
  excerpt?: string;
  author_id: number;
  categories?: number[];
}

export type UpdateArticleDto = Partial<CreateArticleDto>