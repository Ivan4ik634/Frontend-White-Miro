'use client';
import '@/i18n';
import { activityService } from '@/services/Activity.service';
import { boardService } from '@/services/Board.service';
import { scheduleService } from '@/services/Schedule.service';
import { ActivityT } from '@/types/Activity';
import { BoardStatistickT } from '@/types/Board';
import { ScheduleTasksT } from '@/types/Task';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardActivity } from './Activity';
import { CardLastBoards } from './CardLastBoards';
import { CardLastTasks } from './CardLastTasks';
import { CardsHome } from './Cards';
import { CardHome } from './Cards/CardHome';
import { TasksChart } from './Chart/TasksChart';

interface Props {}

export const Home: React.FC<Props> = (props) => {
  const [statistick, setStatistick] = useState<BoardStatistickT>();
  const [scheduleTasks, setScheduleTasks] = useState<ScheduleTasksT[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['activities'],
    queryFn: ({ pageParam = undefined }) => activityService.find(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([boardService.statictick(), scheduleService.tasks()]).then(
      ([statistick, scheduleTasks]) => {
        setStatistick(statistick);
        setScheduleTasks(scheduleTasks);
        setLoading(false);
      },
    );
  }, []);

  if (loading || isLoading)
    return (
      <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  const activities: ActivityT[] = data?.pages.flatMap((page) => page.items) ?? [];
  return (
    <div className="w-full flex max-[900px]:flex-col gap-5 h-[calc(100vh-50px)] max-[900px]:h-auto">
      <div className="w-[60%] max-[900px]:w-full h-full">
        <TasksChart data={scheduleTasks} />
        <CardsHome data={statistick!} />
        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-5 mt-5">
          <CardLastBoards data={statistick!.lastBoards} />
          <CardLastTasks data={statistick!.lastTasks} />
        </div>
      </div>
      <div className="w-[40%] max-[900px]:w-full  flex flex-col h-[calc(100vh-50px)] max-[900px]:h-auto">
        {activities && <CardActivity data={activities} />}
        <div className="mt-5 h-[calc(15vh-50px)] max-[900px]:h-auto grid grid-cols-2 gap-5">
          <CardHome description={t('team_boards')} title={String(statistick!.teamBoards)} />
          <CardHome description={t('avg_members')} title={String(statistick!.avgMembers)} />
        </div>
      </div>
    </div>
  );
};
