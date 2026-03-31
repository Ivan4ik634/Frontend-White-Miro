import { RedirectPage } from '@/components/shared/RedirectPage';
import { Suspense } from 'react';

interface Props {}

const Redirect: React.FC<Props> = (props) => {
  return (
    <Suspense>
      <RedirectPage />
    </Suspense>
  );
};

export default Redirect;
