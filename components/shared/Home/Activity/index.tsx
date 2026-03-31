import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
} from '@/components/ui';
import { ActivityT } from '@/types/Activity';
import dayjs from 'dayjs';
import { Pen, Plus, Trash2, UserPlus } from 'lucide-react';

interface Props {
  data: ActivityT[];
}

export const CardActivity: React.FC<Props> = ({ data }) => {
  return (
    <Card className="h-[85vh] max-[900px]:h-[500px]">
      <CardHeader>
        <CardTitle>Last activity</CardTitle>
        <CardDescription>Recent activity of all boards</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] max-[900px]:h-[400px]">
          <div className="flex flex-col gap-y-5">
            {data.map((obj) => (
              <div className="flex items-start gap-2  w-full max-[900px]:flex-col">
                <div>
                  {obj.type === 'create' ? (
                    <Plus />
                  ) : obj.type === 'invite' ? (
                    <UserPlus />
                  ) : obj.type === 'edit' ? (
                    <Pen />
                  ) : (
                    <Trash2 />
                  )}
                </div>
                <div className="ml-3">
                  <h1 className="font-semibold">{obj.title}</h1>
                  <p className="text-sm">{obj.text}</p>
                  <p className="text-sm opacity-50">
                    {dayjs(obj.createdAt).format('YYYY.MMM.DD HH:mm')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
