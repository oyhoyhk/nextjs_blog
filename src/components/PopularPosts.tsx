'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPopularPosts } from '@/utils/visitorTracker';
import { blogPosts } from '@/data/blogPosts';
import { categories } from '@/data/categories';

interface PopularPost {
  path: string;
  views: number;
  title: string;
  category: string;
}

export default function PopularPosts() {
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([]);

  useEffect(() => {
    const posts = getPopularPosts();
    const postsWithTitles = posts
      .map(post => {
        const pathParts = post.path.split('/');
        if (pathParts.length >= 3) {
          const categorySlug = pathParts[1];
          const postSlug = pathParts[2];
          
          const blogPost = blogPosts.find(p => 
            p.category === categorySlug && p.slug === postSlug
          );
          const category = categories.find(c => c.slug === categorySlug);
          
          if (blogPost && category) {
            return {
              ...post,
              title: blogPost.title,
              category: category.name
            };
          }
        }
        return null;
      })
      .filter((post): post is PopularPost => post !== null);

    setPopularPosts(postsWithTitles);
  }, []);

  if (popularPosts.length === 0) return null;

  return (
    <div className="bg-card rounded-lg shadow-md p-6 border border-border">
      <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        인기 글
      </h3>
      
      <div className="space-y-3">
        {popularPosts.slice(0, 5).map((post, index) => (
          <Link
            key={post.path}
            href={post.path}
            className="block p-3 hover:bg-muted rounded-lg transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="bg-orange-500/10 text-orange-500 text-xs font-medium px-2 py-1 rounded-full mr-2">
                    {index + 1}위
                  </span>
                  {post.category && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {post.category}
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-card-foreground group-hover:text-accent text-sm leading-tight">
                  {post.title}
                </h4>
              </div>
              <div className="ml-3 text-xs text-muted-foreground flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                {post.views.toLocaleString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}