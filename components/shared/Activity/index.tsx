'use client';
import { activityService } from '@/services/Activity.service';
import { ActivityT } from '@/types/Activity';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { ActivityItem } from './ActivityItem';

interface Props {}

export const Activity: React.FC<Props> = (props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['activities'],
    queryFn: ({ pageParam = undefined }) => activityService.find(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: null,
  });
  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      console.log(scrollPosition, pageHeight);
      // если юзер приблизился к низу на 200px
      if (scrollPosition >= pageHeight - 200) {
        // если ещё есть что грузить и сейчас не загружаемся — грузим
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const activities: ActivityT[] = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading)
    return (
      <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold">Activity</h1>
        <p className="opacity-50">Here you can see the activity on your boards</p>
      </div>

      <div className="gap-y-5 mt-3 flex flex-col w-full">
        {activities.length !== 0 ? (
          activities.map((activity) => <ActivityItem key={activity._id} {...activity} />)
        ) : (
          <div className="flex items-center">No activities</div>
        )}
        {isFetchingNextPage && (
          <div className="w-full flex items-center justify-center">
            <Loader className="animate-spin" size={40} />
          </div>
        )}
      </div>
    </div>
  );
};
