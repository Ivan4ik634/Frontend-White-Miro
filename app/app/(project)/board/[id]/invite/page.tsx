import { Container } from '@/components/shared/Container';
import { Invite } from '@/components/shared/Invite';

interface Props {}

const InvitePage: React.FC<Props> = (props) => {
  return (
    <Container className="p-0">
      <Invite />
    </Container>
  );
};
export default InvitePage;
