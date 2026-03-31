'use client';
import { Container } from '@/components/shared/Container';
import { BottomBarMobile } from '@/components/shared/SideBar/BottomBarMobile';
import { TopBarMobile } from '@/components/shared/TopBarMobile';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomBarMobile />
    </>
  );
}
