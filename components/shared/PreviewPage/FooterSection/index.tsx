import { PAGES } from '@/config/pages';
import { Github, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Container } from '../../Container';

interface Props {}

export const FooterSection: React.FC<Props> = (props) => {
  return (
    <div className="pt-20 max-[500px]:pt-5 border-t border-zinc-600 dark:border-zinc-400 w-full ">
      <Container className="ml-0   max-w-[1600px] mx-auto">
        <div className="flex flex-col  ">
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-5">
              <Link href={PAGES.home}>
                <div className="flex items-center gap-x-3">
                  <img src="/White-Miro.png" className="w-[20px] rounded-[3px] h-[20px]" />
                  <p>White miro</p>
                </div>
              </Link>
              <p className="opacity-75">Join us, work in a team quickly and reliably</p>
            </div>
            <div>
              <p className="font-bold">Product</p>
              <div className="flex flex-col mt-2">
                <Link
                  href="#hero"
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  Hero
                </Link>

                <Link
                  href="#advantages"
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  Advantages
                </Link>
                <Link
                  href="#about"
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  About
                </Link>
                <Link
                  href="#features"
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  Features
                </Link>
                <Link
                  href="#what-it-work"
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  What it work
                </Link>
                <Link
                  href="#call-to-action"
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  Call to action
                </Link>
                <Link
                  href={PAGES.dashboard}
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  Dashboard
                </Link>
                <Link
                  href={PAGES.docsStarted}
                  className="opacity-50 duration-300 transition-all hover:opacity-100"
                >
                  Documentation
                </Link>
              </div>
            </div>
            <div className="flex max-[500px]:hidden flex-col gap-y-5">
              <Link href="https://github.com/Ivan4ik634" target="_blank">
                <Github className="transition-all duration-300  hover:text-zinc-500" />
              </Link>
              <Twitter className="transition-all cursor-pointer duration-300 hover:text-blue-500" />
              <Instagram className="transition-all cursor-pointer duration-300 hover:text-pink-500" />
              <Youtube className="transition-all cursor-pointer duration-300 hover:text-red-500" />
            </div>
          </div>
          <div className="hidden max-[500px]:mt-4 max-[500px]:flex flex-row items-center justify-between">
            <Link href="https://github.com/Ivan4ik634" target="_blank">
              <Github className="transition-all duration-300  hover:text-zinc-500" />
            </Link>
            <Twitter className="transition-all cursor-pointer duration-300 hover:text-blue-500" />
            <Instagram className="transition-all cursor-pointer duration-300 hover:text-pink-500" />
            <Youtube className="transition-all cursor-pointer duration-300 hover:text-red-500" />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="opacity-50">© 2025 White Miro. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
//
