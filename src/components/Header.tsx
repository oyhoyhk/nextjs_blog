import Link from 'next/link';
import { categories } from '@/data/categories';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            부자 되는 습관
          </Link>
          
          <nav className="flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}