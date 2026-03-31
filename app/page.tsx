import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { PreviewPage } from '@/components/shared/PreviewPage';

interface Props {}

const AppPage: React.FC<Props> = (props) => {
  return (
    <Container className="ml-0 max-w-[1600px] mx-auto">
      <Header />
      <PreviewPage />
    </Container>
  );
};
export default AppPage;
