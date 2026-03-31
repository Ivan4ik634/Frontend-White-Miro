'use client';
import { Button } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { BOARD_TEMPLATES } from '@/data/templates';
import { boardService } from '@/services/Board.service';
import { userService } from '@/services/User.service';
import { BoardTemplateT } from '@/types/Board';
import { UserT } from '@/types/User';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TemplatesItem } from './TemplatesItem';

interface Props {}

export const Templates: React.FC<Props> = (props) => {
  const [profile, setProfile] = useState<UserT>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userService.profile().then((res) => {
      setProfile(res);
      setLoading(false);
    });
  }, []);
  const handleAddBoard = async (template: BoardTemplateT) => {
    const res = await boardService.create({
      image: '',
      title: template.title,
      text: template.text,
      tags: template.tags,
    });
    if ('message' in res) return toast.error(res.message);
    toast.success('Create board success');
  };
  if (loading)
    return (
      <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  return profile!.isPremium ? (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="opacity-50">
          Using templates, you can create and reuse an element very quickly, templates allow you to
          create boards, tasks, and comments
        </p>
      </div>

      <div className="mt-3">
        <h1 className="font-semibold  text-2xl">Boards</h1>
        <div className="gap-3 mt-3 grid grid-cols-3 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1 w-full">
          {BOARD_TEMPLATES.map((template) => (
            <TemplatesItem {...template} onClick={() => handleAddBoard(template)} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
      <div className="w-[600px]">
        <h1 className="font-semibold text-2xl">
          You need to be a premium user to use this feature
        </h1>
        <Link href={PAGES.settings}>
          <Button className="px-6 mt-5">Go premium</Button>
        </Link>
      </div>
    </div>
  );
};
