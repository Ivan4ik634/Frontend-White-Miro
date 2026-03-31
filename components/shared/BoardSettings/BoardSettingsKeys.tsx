import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { BoardT } from '@/types/Board';

interface Props {
  board: BoardT;
}

export const BoardSettingsKeys: React.FC<Props> = ({ board }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ids(Keys)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Board Id</h1>
            <p className="opacity-50">{board._id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
