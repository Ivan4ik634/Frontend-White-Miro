import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui';

interface Props {
  description: string;
  title: string;
}

export const CardHome: React.FC<Props> = ({ description, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
