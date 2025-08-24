import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { blogPosts } from '@/data/blogPosts';
import PageViewCounter from '@/components/PageViewCounter';

interface PostPageProps {
  params: Promise<{
    category: string;
    item: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { category: categorySlug, item: postSlug } = await params;
  const category = categories.find(cat => cat.slug === categorySlug);
  const post = blogPosts.find(
    post => post.slug === postSlug && post.category === categorySlug
  );
  
  if (!category || !post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-900 transition-colors">홈</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/${categorySlug}`} className="hover:text-gray-900 transition-colors">
              {category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 truncate">{post.title}</li>
        </ol>
      </nav>

      {/* Post Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {category.name}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-gray-600 text-sm gap-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{new Date(post.publishedAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{post.readTime}분 읽기</span>
          </div>
          
          <PageViewCounter pagePath={`/${categorySlug}/${postSlug}`} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Excerpt */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <p className="text-blue-900 text-lg leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Post Content */}
      <article className="prose prose-lg max-w-none">
        <div 
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/^# /gm, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">')
              .replace(/^## /gm, '<h2 class="text-2xl font-semibold text-gray-900 mt-6 mb-3">')
              .replace(/^### /gm, '<h3 class="text-xl font-medium text-gray-900 mt-4 mb-2">')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
              .replace(/^\- /gm, '<li class="ml-4 mb-2">')
              .replace(/^(\d+\. )/gm, '<li class="ml-4 mb-2 list-decimal">')
              .split('\n')
              .map(line => {
                if (line.trim().startsWith('<h') || line.trim().startsWith('<li')) {
                  return line;
                }
                if (line.trim() === '') {
                  return '<br>';
                }
                if (!line.trim().startsWith('<')) {
                  return `<p class="mb-4 leading-relaxed">${line}</p>`;
                }
                return line;
              })
              .join('')
          }}
        />
      </article>

      {/* Related Posts */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          관련 글
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts
            .filter(p => p.category === categorySlug && p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/${categorySlug}/${relatedPost.slug}`}
                className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {relatedPost.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="text-xs text-gray-500">
                  {new Date(relatedPost.publishedAt).toLocaleDateString('ko-KR')} • {relatedPost.readTime}분 읽기
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Back to Category */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link
          href={`/${categorySlug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {category.name} 글 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const params = [];
  
  for (const post of blogPosts) {
    params.push({
      category: post.category,
      item: post.slug,
    });
  }
  
  return params;
}