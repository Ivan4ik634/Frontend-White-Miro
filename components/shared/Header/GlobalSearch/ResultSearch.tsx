import { ScrollArea } from '@/components/ui';
import { linksDocs } from '@/data/linksDocs';
import { useLinks } from '@/hooks/useLinks';
import { BoardT } from '@/types/Board';
import { TaskT } from '@/types/Task';
import { GlobalSearchItem } from './GlobalSearchItem';

interface Props {
  search: string;
  boards: BoardT[];
  tasks: TaskT[];
}

export const ResultSearch: React.FC<Props> = ({ search, boards, tasks }) => {
  const dashboardLinks = useLinks();

  const filteredDashboardLinks = dashboardLinks.filter((obj) => {
    if (search && !obj.name.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });
  const filteredDocsLinks = linksDocs.filter((obj) => {
    if (search && !obj.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });
  const filteredBoards = boards.filter((board) => {
    if (search && !board.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });
  const filteredTasks = tasks.filter((task) => {
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });
  return (
    <ScrollArea className="max-h-[300px]">
      <div className="flex flex-col gap-y-3">
        {filteredDashboardLinks.length > 0 && (
          <div className="flex flex-col gap-y-3 w-full">
            <h1 className="text-2xl mb-2 opacity-50">Dashboard</h1>
            {filteredDashboardLinks.map((obj) => (
              <GlobalSearchItem title={obj.name} url={obj.url} type="page" />
            ))}
          </div>
        )}
        {filteredDocsLinks.length > 0 && (
          <div className="flex flex-col gap-y-3 w-full">
            <h1 className="text-2xl mb-2 opacity-50">Documentation</h1>
            {filteredDocsLinks.map((obj) => (
              <GlobalSearchItem title={obj.title} url={obj.url} type="page" />
            ))}
          </div>
        )}
        {filteredBoards.length > 0 && (
          <div className="flex flex-col gap-y-3 w-full">
            <h1 className="text-2xl mb-2 opacity-50">My boards</h1>
            {filteredBoards.map((obj) => (
              <GlobalSearchItem title={obj.title} url={obj._id} type="board" />
            ))}
          </div>
        )}
        {filteredTasks.length > 0 && (
          <div className="flex flex-col gap-y-3 w-full">
            <h1 className="text-2xl mb-2 opacity-50">My tasks</h1>
            {filteredTasks.map((obj) => (
              <GlobalSearchItem title={obj.title} url={obj._id} type="task" />
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
