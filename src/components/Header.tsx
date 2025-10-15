import Link from 'next/link';
import { categories } from '@/data/categories';

export default function Header() {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-[10px] md:text-2xl font-bold text-card-foreground">
            부자 되는 습관
          </Link>

          <nav className="flex space-x-1 md:space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="text-muted-foreground hover:text-card-foreground px-1 md:px-3 py-2 text-[8px] md:text-sm font-medium transition-colors"
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