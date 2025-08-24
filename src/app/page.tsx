import Link from 'next/link';
import { categories } from '@/data/categories';
import { blogPosts } from '@/data/blogPosts';
import VisitorStats from '@/components/VisitorStats';
import PopularPosts from '@/components/PopularPosts';

export default function Home() {
  const recentPosts = blogPosts.slice(0, 6).sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          부자 되는 습관
        </h1>
        <p className="text-xl text-gray-600">
          주식, 암호화폐, 부동산 투자 인사이트와 분석을 제공합니다
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {category.name}
            </h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">글 보기 →</span>
              <span className="text-sm text-gray-400">
                {blogPosts.filter(post => post.category === category.slug).length}개 글
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-8">
        <VisitorStats />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">최근 게시글</h2>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <Link
                href={`/${post.category}/${post.slug}`}
                className="group block hover:bg-gray-50 p-4 rounded-lg transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {categories.find(cat => cat.slug === post.category)?.name}
                      </span>
                      <span>{post.readTime}분 읽기</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <PopularPosts />
      </div>
    </div>
  );
}
