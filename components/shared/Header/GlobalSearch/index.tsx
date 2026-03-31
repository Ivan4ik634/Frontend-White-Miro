'use client';

import { Dialog, DialogContent, Input } from '@/components/ui';
import { boardService } from '@/services/Board.service';
import { taskService } from '@/services/Task.service';
import { BoardT } from '@/types/Board';
import { TaskT } from '@/types/Task';
import Cookies from 'js-cookie';
import { ReactNode, useEffect, useState } from 'react';
import { ResultSearch } from './ResultSearch';

export function GlobalSearch({
  className = '',
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [boards, setBoards] = useState<BoardT[]>([]);
  const [tasks, setTasks] = useState<TaskT[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    if (open && !!!token) {
      Promise.all([boardService.find(), taskService.find()]).then(([resBoards, resTasks]) => {
        setBoards(resBoards);
        setTasks(resTasks);
      });
    }
  }, [open]);

  return (
    <>
      <div className={className} onClick={() => setOpen(true)}>
        {children}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full mt-3"
            placeholder="Global search..."
          />
          <ResultSearch search={search} boards={boards} tasks={tasks} />
        </DialogContent>
      </Dialog>
    </>
  );
}
