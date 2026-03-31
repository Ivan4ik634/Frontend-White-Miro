import { Container } from '@/components/shared/Container';
import { DocsHeaderMobile } from '@/components/shared/Docs/HeaderMobile';
import { DocsLeftBar } from '@/components/shared/Docs/LeftBar';
import { DocsRightBar } from '@/components/shared/Docs/RightBar';

import { Header } from '@/components/shared/Header';

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="mt-[50px] max-[900px]:mt-[100px] max-w-[1600px] mx-auto">
      <Header />
      <DocsHeaderMobile />
      <div className=" w-full flex">
        <DocsLeftBar />
        <div className="w-full">{children}</div>
        <DocsRightBar />
      </div>
    </Container>
  );
}
