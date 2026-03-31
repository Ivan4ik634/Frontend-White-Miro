'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
};

export function DocsRightBar() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // Находим все h1
    const elements = Array.from(document.querySelectorAll('h2')) as HTMLElement[];

    const mapped = elements.map((el) => ({
      id: el.id,
      text: el.innerText,
    }));

    setHeadings(mapped);

    // Следим за активным заголовком
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '0px 0px -70% 0px', // подсвечивает чуть раньше, когда заголовок виден
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <aside className="sticky top-20  h-[calc(100vh-80px)] overflow-y-auto w-[300px] pl-10 text-sm hidden lg:block">
      <p className="font-medium text-gray-700 mb-2">On this page</p>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className="relative pl-2">
            {activeId === h.id && (
              <span className="absolute left-0 top-1 h-4 w-[2px] bg-blue-500 rounded-full" />
            )}
            <a
              href={`#${h.id}`}
              className={`block hover:text-blue-500 transition-colors ${
                activeId === h.id ? 'text-blue-600 font-semibold' : 'text-gray-600'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
