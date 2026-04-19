// NOTE: For defining and exporting types and interfaces

export type Default = {
    field: string;
};

// Login API interfaces

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: {
    email: string;
    token: string;
  };
  message?: string;
}

export interface MockUser {
  email: string;
  password: string;
  token: string;
}


// News type definitions
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
  file_path: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  created_at: string;
  author: Author;
  categories: Category[];
  images: ArticleImage[];
}
