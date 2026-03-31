import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { boardService } from '@/services/Board.service';
import { BoardT } from '@/types/Board';
import { LogOutIcon, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ConfirmationDialog } from '../ConfirmationDialog';

interface Props {
  board: BoardT;
}

export const BoardSettingsDanger: React.FC<Props> = ({ board }) => {
  const userId = useAuth()

  const isAvtor = board.userId === userId
  const router = useRouter();
  const handleDeleteBoard = async () => {
    const res = await boardService.delete(board._id);
    toast.success(res.message);
    router.push('/app/boards');
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger zone</CardTitle>
        <CardDescription>Irreversible actions. Proceed with caution.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-between">
          {isAvtor ? (
            <>
              <div>
                <h1 className="font-semibold">Delete board</h1>
                <p className="opacity-50">
                  This action will permanently remove the board and all related data.
                </p>
              </div>

              <ConfirmationDialog title="delete board" onSubmit={handleDeleteBoard}>
                <Button variant="destructive" className="gap-x-3">
                  <Trash2 />
                  <p>Delete board</p>
                </Button>
              </ConfirmationDialog>
            </>
          ) : (
            <>
              <div>
                <h1 className="font-semibold">Leave board</h1>
                <p className="opacity-50">You will no longer have access to this board.</p>
              </div>
              <ConfirmationDialog title="leave board" onSubmit={handleDeleteBoard}>
                <Button variant="destructive" className="gap-x-3">
                  <LogOutIcon />
                  <p>Leave board</p>
                </Button>
              </ConfirmationDialog>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
