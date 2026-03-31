'use client';
import { Button } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { linksHeader } from '@/data/linksHeader';
import { useLocalStorage } from '@white-black/react-hooks-lib';
import Cookies from 'js-cookie';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from '../Container';
import { GlobalSearch } from './GlobalSearch';
interface Props {}

export const Header: React.FC<Props> = (props) => {
  const isAuth = Cookies.get('isAuth');
  const [activeId, setActiveId] = useState('');
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.observer'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '0px 0px -65% 0px', // центр смещения
      },
    );

    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  console.log(activeId);
  return (
    <>
      <div
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
        className="h-[50px] z-10 fixed top-0 left-0 w-full block max-[900px]:hidden "
      >
        <Container className="h-full flex  items-center justify-between ml-0 max-w-[1600px] mx-auto">
          <Link href={PAGES.home} className="flex items-center gap-x-2">
            <img src="/White-Miro.png" className="w-[20px] rounded-[3px] h-[20px]" />
            <h1 className="font-bold text-2xl">White Miro</h1>
          </Link>
          <div className="gap-x-3 flex items-center">
            <div className="gap-x-3 flex items-center">
              {linksHeader.map((el) => (
                <Link
                  href={`/${el.id}`}
                  key={el.id}
                  className={`opacity-50 hover:opacity-100 duration-300 transition-all ${
                    activeId === el.id ? 'opacity-100' : ''
                  }`}
                >
                  {el.text}
                </Link>
              ))}
              <Link
                className="opacity-50 hover:opacity-100 duration-300 transition-all"
                href={PAGES.docsStarted}
              >
                Documentation
              </Link>
            </div>

            <GlobalSearch className=" w-[250px] cursor-pointer rounded-[5px] px-3 py-1 bg-zinc-200/50 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 duration-200 transition-all flex items-center justify-between">
              <p className="opacity-50">Search...</p>
              <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                <span className="text-xs">⌘</span>K
              </kbd>
            </GlobalSearch>
            <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </Button>
            <div className="pl-3 gap-x-3 flex items-center">
              {isAuth ? (
                <Link href={PAGES.dashboard}>
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href={PAGES.login}>Login</Link>
                  <Link href={PAGES.register}>
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
