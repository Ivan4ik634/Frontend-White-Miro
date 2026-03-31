import { linksBoardsDocs, linksStartedDocs, linksTasksDocs } from '@/data/linksDocs';
import { DocsDescription } from '../ui/description';
import { DocsLeftBarItem } from './LeftBarItem';

interface Props {}

export const DocsLeftBar: React.FC<Props> = (props) => {
  return (
    <div className="sticky flex gap-y-4 h-[calc(100vh-80px)] flex-col top-[50px] max-[900px]:hidden  w-[300px]  py-2">
      <div>
        <DocsDescription className="mb-1 opacity-75">Get started</DocsDescription>
        {linksStartedDocs.map((link, i) => (
          <DocsLeftBarItem {...link} key={i} />
        ))}
      </div>
      <div>
        <DocsDescription className="mb-1 opacity-75">Boards</DocsDescription>
        {linksBoardsDocs.map((link, i) => (
          <DocsLeftBarItem {...link} key={i} />
        ))}
      </div>
      <div>
        <DocsDescription className="mb-1 opacity-75">Tasks</DocsDescription>
        {linksTasksDocs.map((link, i) => (
          <DocsLeftBarItem {...link} key={i} />
        ))}
      </div>
    </div>
  );
};
