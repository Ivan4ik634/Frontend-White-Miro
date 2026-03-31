import { Badge, Button } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { AdvantagesSection } from '../AdvantagesSection';

interface Props {}

export const HeroSection: React.FC<Props> = (props) => {
  return (
    <div
      id="hero"
      className="observer  flex h-[calc(100vh-12px)] items-center justify-center flex-col "
    >
      <div className="flex items-center flex-col mb-10 pr-[50px] max-[1200px]:mb-3 max-[1200px]:pr-0 text-center">
        <div className="flex items-center gap-x-4">
          <Badge variant="outline" className="flex gap-x-2 px-3 py-2">
            <Zap className="w-[25px] h-[25px]" />
            <p className=" font-semibold">Real-time updates</p>
          </Badge>
          <Badge variant="outline" className="flex gap-x-2 px-3 py-2">
            <Users className="w-[25px] h-[25px]" />
            <p className=" font-semibold">Team-first</p>
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-center mt-5 max-[900px]:text-xl">
          Your workflow, organized clearly.
        </h1>
        <p className="text-2xl  max-[900px]:text-sm mt-5">
          White Miro helps teams structure work, plan tasks, and coordinate execution in a single
          visual workspace. Create boards, assign tasks, track progress, and make decisions faster —
          without switching between tools.
        </p>
        <div className="flex items-center mt-8 gap-x-2">
          <Link href={PAGES.register}>
            <Button size="lg">Start now</Button>
          </Link>
          <Link href={PAGES.docsStarted}>
            <Button size="lg" variant="outline">
              Read docs
            </Button>
          </Link>
        </div>
      </div>
      <AdvantagesSection />
    </div>
  );
};
