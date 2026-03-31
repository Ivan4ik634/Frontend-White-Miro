'use client';
import { useLinks } from '@/hooks/useLinks';
import '@/i18n';
import { FullSideBar } from './FullSideBar';
import { MiniSideBar } from './MiniSideBar';

interface Props {
  openMiniSidebar: boolean;
  setOpenMiniSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar: React.FC<Props> = ({ openMiniSidebar, setOpenMiniSidebar }) => {
  const Links = useLinks();

  return (
    <div>
      {!openMiniSidebar ? (
        <FullSideBar Links={Links} setOpenMiniSidebar={setOpenMiniSidebar} />
      ) : (
        <MiniSideBar Links={Links} setOpenMiniSidebar={setOpenMiniSidebar} />
      )}
    </div>
  );
};
