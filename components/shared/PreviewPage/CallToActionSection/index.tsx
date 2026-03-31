import { Button } from '@/components/ui';
import { PAGES } from '@/config/pages';
import Link from 'next/link';

interface Props {}

export const CallToActionSection: React.FC<Props> = (props) => {
  return (
    <div
      id="call-to-action"
      className="observer flex flex-col mb-60 max-[900px]:mb-10 items-center"
    >
      <div className="w-[900px] max-[900px]:w-full flex flex-col items-center">
        <h1 className="font-semibold text-5xl max-[900px]:text-2xl mb-10 text-center">
          Organize tasks, plan projects, and collaborate in real time — all for free. No hidden
          fees. No limits.
        </h1>
        <Link href={PAGES.register}>
          <Button size="lg">Get started for free</Button>
        </Link>
      </div>
    </div>
  );
};
