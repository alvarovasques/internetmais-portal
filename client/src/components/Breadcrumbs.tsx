import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <a
                href={item.href}
                className="text-[#3DD93D] hover:text-[#2BA82A] font-semibold transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className={item.active ? 'text-[#0D1B3E] font-semibold' : ''}>
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight size={16} className="text-gray-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
