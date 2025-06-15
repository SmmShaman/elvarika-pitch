import { createContext, useContext } from 'react';

interface BlogContextType {
  openBlog: () => void;
}

export const BlogContext = createContext<BlogContextType | null>(null);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};