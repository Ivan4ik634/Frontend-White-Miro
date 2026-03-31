'use client';
import { Container } from '@/components/shared/Container';
import { SideBar } from '@/components/shared/SideBar';
import { useLocalStorage } from '@white-black/react-hooks-lib';

export default function AutDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openMiniSidebar, setOpenMiniSidebar] = useLocalStorage('openMiniSidebar', false);

  return (
    <>
      <SideBar openMiniSidebar={openMiniSidebar} setOpenMiniSidebar={setOpenMiniSidebar} />
      <Container openMiniSidebar={openMiniSidebar}>{children}</Container>
    </>
  );
}
