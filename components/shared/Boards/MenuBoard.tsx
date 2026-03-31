import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuDiv,
  DropdownMenuTrigger,
} from '@/components/ui';
import { PAGES } from '@/config/pages';
import { boardService } from '@/services/Board.service';
import { useBoards } from '@/store/useBoards';
import { BoardT } from '@/types/Board';
import { ArrowUpRightFromCircle, Edit, EllipsisVertical, Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { BoardDialog } from '../BoardDialog';
import { ConfirmationDialog } from '../ConfirmationDialog';

interface Props {
  board: BoardT;
}

export const MenuBoard: React.FC<Props> = ({ board }) => {
  const { deleteBoard } = useBoards();
  const handleDelete = async () => {
    const res = await boardService.delete(board._id);
    if ('message' in res) return toast.success(res.message);

    deleteBoard(board._id);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-full">
        <Link href={PAGES.board(board._id)}>
          <DropdownMenuDiv className="flex items-center">
            <ArrowUpRightFromCircle />
            Go to board
          </DropdownMenuDiv>
        </Link>
        <Link href={PAGES.boardSettings(board._id)} className="">
          <DropdownMenuDiv className="flex items-center">
            <Settings />
            Go to board settings
          </DropdownMenuDiv>
        </Link>
        <BoardDialog type="edit" board={board}>
          <DropdownMenuDiv className="flex items-center">
            <Edit />
            Edit board
          </DropdownMenuDiv>
        </BoardDialog>
        <ConfirmationDialog title="delete board" onSubmit={handleDelete}>
          <DropdownMenuDiv className="flex cursor-pointer text-red-500 items-center">
            <Trash2 color="red" />
            Delete board
          </DropdownMenuDiv>
        </ConfirmationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
